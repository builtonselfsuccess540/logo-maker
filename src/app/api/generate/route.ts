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
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    const svgPrompt = `You are an expert logo designer who creates SVG logos. Create a logo based on this request:

Description: ${prompt}
Style: ${style || 'modern minimalist'}
Color scheme: ${colorScheme || 'vibrant colors'}

IMPORTANT: Respond with ONLY valid SVG code. No explanations, no markdown, no code blocks.

Requirements for the SVG:
- viewBox="0 0 200 200"
- Use simple shapes: rect, circle, ellipse, polygon, path, text
- Include brand text if the description mentions a name
- Use colors matching the requested color scheme
- Keep it simple and professional
- Make sure all tags are properly closed

Start directly with <svg and end with </svg>`

    const result = await model.generateContent(svgPrompt)
    const response = await result.response
    const text = response.text()

    // Extract SVG from response (handle potential markdown code blocks)
    let svgCode = text

    // Remove markdown code blocks if present
    svgCode = svgCode.replace(/```svg\n?/gi, '').replace(/```xml\n?/gi, '').replace(/```\n?/g, '')

    // Extract just the SVG
    const svgMatch = svgCode.match(/<svg[\s\S]*?<\/svg>/i)

    if (svgMatch) {
      svgCode = svgMatch[0]
      // Convert SVG to base64 data URL
      const base64 = Buffer.from(svgCode).toString('base64')
      const dataUrl = `data:image/svg+xml;base64,${base64}`

      return NextResponse.json({
        image: dataUrl,
        svg: svgCode,
        type: 'svg'
      })
    }

    // If no valid SVG, generate a description instead
    const fallbackPrompt = `Describe a professional logo design for: ${prompt}
Style: ${style || 'modern minimalist'}
Colors: ${colorScheme || 'vibrant colors'}

Provide a brief, creative description of what this logo would look like.`

    const fallbackResult = await model.generateContent(fallbackPrompt)
    const fallbackResponse = await fallbackResult.response

    return NextResponse.json({
      description: fallbackResponse.text(),
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
