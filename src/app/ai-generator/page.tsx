'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Sparkles, Download, RefreshCw, Loader2 } from 'lucide-react'

const styles = [
  { value: 'minimalist', label: 'Minimalist' },
  { value: 'modern', label: 'Modern' },
  { value: 'vintage', label: 'Vintage' },
  { value: 'playful', label: 'Playful' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'tech', label: 'Tech/Futuristic' },
  { value: 'elegant', label: 'Elegant' },
  { value: 'bold', label: 'Bold' },
]

const colorSchemes = [
  { value: 'vibrant', label: 'Vibrant Colors' },
  { value: 'monochrome', label: 'Monochrome' },
  { value: 'pastel', label: 'Pastel' },
  { value: 'dark', label: 'Dark Theme' },
  { value: 'earth', label: 'Earth Tones' },
  { value: 'neon', label: 'Neon/Bright' },
  { value: 'gradient', label: 'Gradient' },
  { value: 'classic', label: 'Classic (Black/White/Gold)' },
]

interface GenerationResult {
  image?: string
  svg?: string
  description?: string
  type: 'svg' | 'description'
}

export default function AIGeneratorPage() {
  const [prompt, setPrompt] = useState('')
  const [style, setStyle] = useState('minimalist')
  const [colorScheme, setColorScheme] = useState('vibrant')
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<GenerationResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  const generateLogo = async () => {
    if (!prompt.trim()) {
      setError('Please enter a description for your logo')
      return
    }

    setIsGenerating(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, style, colorScheme }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate logo')
      }

      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadImage = () => {
    if (!result?.image) return

    const link = document.createElement('a')
    link.download = 'ai-logo.png'
    link.href = result.image
    link.click()
  }

  const downloadSVG = () => {
    if (!result?.svg) return

    const blob = new Blob([result.svg], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = 'ai-logo.svg'
    link.href = url
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="min-h-screen p-4 sm:p-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold gradient-text">AI-Powered Generator</h1>
        <p className="text-gray-400 mt-2">Describe your vision and let AI create unique logo concepts</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="glass rounded-2xl p-6 space-y-6">
          {/* Prompt Input */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Describe your logo
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A modern tech startup logo with a lightning bolt, representing speed and innovation..."
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
            />
          </div>

          {/* Style & Color Selection */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Style</label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              >
                {styles.map((s) => (
                  <option key={s.value} value={s.value} className="bg-gray-900">
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Color Scheme</label>
              <select
                value={colorScheme}
                onChange={(e) => setColorScheme(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              >
                {colorSchemes.map((c) => (
                  <option key={c.value} value={c.value} className="bg-gray-900">
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateLogo}
            disabled={isGenerating}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6" />
                Generate Logo
              </>
            )}
          </button>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300">
              {error}
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="space-y-4 pt-6 border-t border-white/10">
              <h3 className="text-lg font-semibold text-white">Generated Result</h3>

              {result.image && (
                <div ref={imageRef} className="bg-white rounded-xl p-8 flex items-center justify-center">
                  <img
                    src={result.image}
                    alt="Generated Logo"
                    className="max-w-full max-h-64 object-contain"
                  />
                </div>
              )}

              {result.description && !result.image && (
                <div className="bg-white/5 rounded-xl p-6">
                  <h4 className="text-sm font-medium text-purple-400 mb-2">Logo Concept Description</h4>
                  <p className="text-gray-300 whitespace-pre-wrap">{result.description}</p>
                </div>
              )}

              {/* Download Buttons */}
              <div className="flex gap-4">
                {result.image && (
                  <button
                    onClick={downloadImage}
                    className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    Download PNG
                  </button>
                )}
                {result.svg && (
                  <button
                    onClick={downloadSVG}
                    className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    Download SVG
                  </button>
                )}
                <button
                  onClick={generateLogo}
                  disabled={isGenerating}
                  className="flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-colors"
                >
                  <RefreshCw className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
                  Regenerate
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="mt-8 glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Tips for Better Results</h3>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-purple-400">•</span>
              Be specific about your brand or business type
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400">•</span>
              Mention specific elements you want (e.g., "a mountain", "a leaf", "abstract shapes")
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400">•</span>
              Describe the feeling you want to convey (e.g., "professional", "friendly", "innovative")
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400">•</span>
              Try different style and color combinations for variety
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}
