import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export interface GenerateLogoOptions {
  prompt: string
  style: string
  colorScheme: string
}

export async function generateLogoWithAI(options: GenerateLogoOptions): Promise<string> {
  const { prompt, style, colorScheme } = options

  const fullPrompt = `Create a professional logo design concept.
Description: ${prompt}
Style: ${style}
Color scheme: ${colorScheme}

Generate a detailed, creative description of this logo design that could be used as a visual reference. Include specific details about:
- The main visual elements and their arrangement
- The typography style if text is included
- The color palette with specific hex codes
- The overall composition and balance
- Any symbolic meaning or design rationale

Make it professional and suitable for a business or brand.`

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const result = await model.generateContent(fullPrompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Error generating logo:', error)
    throw new Error('Failed to generate logo concept')
  }
}

export async function generateLogoImage(options: GenerateLogoOptions): Promise<string | null> {
  const { prompt, style, colorScheme } = options

  const imagePrompt = `A professional logo design: ${prompt}. Style: ${style}. Colors: ${colorScheme}. Clean, vector-style, minimalist, on a solid background, suitable for business branding.`

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp-image-generation' })
    const result = await model.generateContent(imagePrompt)
    const response = await result.response

    // Check if the response contains an image
    const parts = response.candidates?.[0]?.content?.parts
    if (parts) {
      for (const part of parts) {
        if ('inlineData' in part && part.inlineData) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`
        }
      }
    }

    return null
  } catch (error) {
    console.error('Error generating logo image:', error)
    return null
  }
}
