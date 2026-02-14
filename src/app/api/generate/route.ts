import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(request: NextRequest) {
  try {
    const { prompt, style, colorScheme } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
    }

    const imagePrompt = `Create a professional, clean logo design: ${prompt}.
Style: ${style || 'modern minimalist'}.
Color scheme: ${colorScheme || 'vibrant colors'}.
The logo should be:
- Simple and memorable
- Suitable for business branding
- Clean vector-style appearance
- Centered on a solid background
- Professional and polished

Generate a high-quality logo image.`

    try {
      // Try image generation model first
      const model = genAI.getGenerativeModel({
        model: 'gemini-2.0-flash-exp',
        generationConfig: {
          responseMimeType: 'text/plain',
        }
      })

      // Generate a detailed text description for the logo
      const descriptionPrompt = `You are a professional logo designer. Based on this request, create a detailed SVG logo description.

Request: ${prompt}
Style: ${style || 'modern minimalist'}
Colors: ${colorScheme || 'vibrant colors'}

Respond with ONLY valid SVG code for a simple, professional logo. The SVG should:
- Be 200x200 viewBox
- Use simple shapes (circles, rectangles, paths)
- Include the brand name as text if appropriate
- Use the specified color scheme
- Be clean and minimalist

Start your response with <svg and end with </svg>. No explanation, just the SVG code.`

      const result = await model.generateContent(descriptionPrompt)
      const response = await result.response
      const text = response.text()

      // Extract SVG from response
      const svgMatch = text.match(/<svg[\s\S]*<\/svg>/i)
      if (svgMatch) {
        const svgCode = svgMatch[0]
        // Convert SVG to base64 data URL
        const base64 = Buffer.from(svgCode).toString('base64')
        const dataUrl = `data:image/svg+xml;base64,${base64}`

        return NextResponse.json({
          image: dataUrl,
          svg: svgCode,
          type: 'svg'
        })
      }

      // If no SVG, return the text description
      return NextResponse.json({
        description: text,
        type: 'description'
      })

    } catch (genError: unknown) {
      console.error('Generation error:', genError)

      // Fallback: generate a text description
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

      const fallbackPrompt = `Describe a professional logo design for: ${prompt}
Style: ${style || 'modern minimalist'}
Colors: ${colorScheme || 'vibrant colors'}

Provide a brief, creative description of what this logo would look like, including:
- Main visual elements
- Color palette
- Typography suggestions
- Overall composition`

      const result = await model.generateContent(fallbackPrompt)
      const response = await result.response

      return NextResponse.json({
        description: response.text(),
        type: 'description'
      })
    }

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate logo' },
      { status: 500 }
    )
  }
}
