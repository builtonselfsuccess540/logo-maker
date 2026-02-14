import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(request: NextRequest) {
  try {
    const { prompt, style, colorScheme } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

    // Use the image generation model
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-exp-image-generation',
    })

    const imagePrompt = `Generate a professional logo image:

${prompt}

Style: ${style || 'modern minimalist'}
Color scheme: ${colorScheme || 'vibrant colors'}

Requirements:
- Clean, professional logo design
- High quality and detailed
- Suitable for business branding
- Centered composition on a clean background
- Vector-style appearance`

    const result = await model.generateContent(imagePrompt)
    const response = await result.response

    // Check for generated image in the response
    const candidates = response.candidates
    if (candidates && candidates.length > 0) {
      const parts = candidates[0].content?.parts
      if (parts) {
        for (const part of parts) {
          // Check if this part contains image data
          if ('inlineData' in part && part.inlineData) {
            const imageData = part.inlineData
            const dataUrl = `data:${imageData.mimeType};base64,${imageData.data}`
            return NextResponse.json({
              image: dataUrl,
              type: 'image'
            })
          }
        }

        // If no image but has text, return as description
        for (const part of parts) {
          if ('text' in part && part.text) {
            return NextResponse.json({
              description: part.text,
              type: 'description'
            })
          }
        }
      }
    }

    // Fallback: use regular model to generate SVG
    const svgModel = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    const svgPrompt = `Create a simple SVG logo for: ${prompt}
Style: ${style || 'modern minimalist'}
Colors: ${colorScheme || 'vibrant colors'}

Respond with ONLY valid SVG code. viewBox="0 0 200 200". Start with <svg and end with </svg>.`

    const svgResult = await svgModel.generateContent(svgPrompt)
    const svgResponse = await svgResult.response
    const text = svgResponse.text()

    // Extract SVG
    const svgMatch = text.replace(/```[\s\S]*?```/g, '').match(/<svg[\s\S]*?<\/svg>/i)
    if (svgMatch) {
      const base64 = Buffer.from(svgMatch[0]).toString('base64')
      return NextResponse.json({
        image: `data:image/svg+xml;base64,${base64}`,
        svg: svgMatch[0],
        type: 'svg'
      })
    }

    return NextResponse.json({
      description: text,
      type: 'description'
    })

  } catch (error) {
    console.error('API Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: `Failed to generate logo: ${errorMessage}` },
      { status: 500 }
    )
  }
}
