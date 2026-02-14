import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { prompt, style, colorScheme } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
    }

    // Use Imagen API for image generation
    const imagePrompt = `A professional minimalist logo design: ${prompt}. Style: ${style || 'modern clean'}. Colors: ${colorScheme || 'vibrant'}. Simple flat design, centered on white background, suitable for branding.`

    const imagenResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:generateImages?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: imagePrompt,
          config: {
            numberOfImages: 1,
            aspectRatio: '1:1',
            outputConfig: {
              mimeType: 'image/png'
            }
          }
        })
      }
    )

    if (imagenResponse.ok) {
      const data = await imagenResponse.json()
      if (data.generatedImages && data.generatedImages.length > 0) {
        const imageData = data.generatedImages[0].image
        if (imageData.bytesBase64Encoded) {
          return NextResponse.json({
            image: `data:image/png;base64,${imageData.bytesBase64Encoded}`,
            type: 'image'
          })
        }
      }
    }

    // Fallback to Gemini for SVG generation
    const { GoogleGenerativeAI } = await import('@google/generative-ai')
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    const svgPrompt = `You are a logo designer. Create an SVG logo based on: ${prompt}
Style: ${style || 'modern minimalist'}
Colors: ${colorScheme || 'vibrant colors'}

Output ONLY valid SVG code with viewBox="0 0 200 200". Use simple shapes and the specified colors. No explanations.`

    const result = await model.generateContent(svgPrompt)
    const text = result.response.text()

    // Extract SVG
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
