import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { prompt, style, colorScheme } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
    }

    // Build a detailed image prompt
    const imagePrompt = `${prompt}, ${style || 'modern'} style, ${colorScheme || 'vibrant'} colors, professional logo design, high quality, detailed, clean background`

    // Try Imagen 4.0 first (generates actual detailed images)
    try {
      const imagenResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            instances: [{ prompt: imagePrompt }],
            parameters: {
              sampleCount: 1,
              aspectRatio: '1:1',
              safetyFilterLevel: 'block_few',
              personGeneration: 'allow_adult'
            }
          })
        }
      )

      const imagenData = await imagenResponse.json()

      if (imagenData.predictions && imagenData.predictions.length > 0) {
        const prediction = imagenData.predictions[0]
        if (prediction.bytesBase64Encoded) {
          return NextResponse.json({
            image: `data:image/png;base64,${prediction.bytesBase64Encoded}`,
            type: 'image'
          })
        }
      }

      // If Imagen failed, log the error and try Gemini
      console.log('Imagen response:', JSON.stringify(imagenData).slice(0, 500))
    } catch (imagenError) {
      console.error('Imagen error:', imagenError)
    }

    // Try Gemini 3 Pro image generation model
    try {
      const geminiImageResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: `Generate an image: ${imagePrompt}` }]
            }],
            generationConfig: {
              responseModalities: ['IMAGE', 'TEXT']
            }
          })
        }
      )

      const geminiData = await geminiImageResponse.json()

      if (geminiData.candidates && geminiData.candidates[0]?.content?.parts) {
        for (const part of geminiData.candidates[0].content.parts) {
          if (part.inlineData) {
            return NextResponse.json({
              image: `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`,
              type: 'image'
            })
          }
        }

        // Check for text response (might be a rejection message)
        for (const part of geminiData.candidates[0].content.parts) {
          if (part.text) {
            // If it's a policy message, return it
            if (part.text.toLowerCase().includes('policy') || part.text.toLowerCase().includes('unable')) {
              return NextResponse.json({
                description: part.text,
                type: 'description'
              })
            }
          }
        }
      }

      console.log('Gemini image response:', JSON.stringify(geminiData).slice(0, 500))
    } catch (geminiImageError) {
      console.error('Gemini image error:', geminiImageError)
    }

    // Final fallback: Generate SVG with Gemini text model
    const { GoogleGenerativeAI } = await import('@google/generative-ai')
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    const svgPrompt = `Create a detailed, professional SVG logo.

Description: ${prompt}
Style: ${style || 'modern minimalist'}
Colors: ${colorScheme || 'vibrant colors'}

Create an SVG with:
- viewBox="0 0 400 400" for more detail
- Use gradients (linearGradient, radialGradient) for depth
- Use multiple layered shapes for complexity
- Add subtle shadows or highlights
- Make it visually interesting and professional

Output ONLY the SVG code, starting with <svg and ending with </svg>. No explanations.`

    const result = await model.generateContent(svgPrompt)
    const text = result.response.text()

    const cleaned = text.replace(/```[a-z]*\n?/gi, '').replace(/```/g, '')
    const svgMatch = cleaned.match(/<svg[\s\S]*?<\/svg>/i)

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
