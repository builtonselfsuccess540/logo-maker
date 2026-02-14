'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import LogoCanvas from '@/components/LogoCanvas'
import ColorPicker from '@/components/ColorPicker'
import FontSelector from '@/components/FontSelector'
import DownloadButton from '@/components/DownloadButton'
import { getGoogleFontsUrl } from '@/lib/fonts'

type TextEffect = 'none' | 'shadow' | 'outline' | 'glow'
type TextTransform = 'none' | 'uppercase' | 'lowercase' | 'capitalize'

export default function TextLogoPage() {
  const canvasRef = useRef<HTMLDivElement>(null)

  const [text, setText] = useState('Your Logo')
  const [font, setFont] = useState('Inter, sans-serif')
  const [fontSize, setFontSize] = useState(48)
  const [fontWeight, setFontWeight] = useState('700')
  const [textColor, setTextColor] = useState('#ffffff')
  const [backgroundColor, setBackgroundColor] = useState('#1a1a2e')
  const [letterSpacing, setLetterSpacing] = useState(0)
  const [textTransform, setTextTransform] = useState<TextTransform>('none')
  const [effect, setEffect] = useState<TextEffect>('none')
  const [useGradient, setUseGradient] = useState(false)
  const [gradientFrom, setGradientFrom] = useState('#667eea')
  const [gradientTo, setGradientTo] = useState('#764ba2')
  const [gradientDirection, setGradientDirection] = useState('135deg')

  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement('link')
    link.href = getGoogleFontsUrl()
    link.rel = 'stylesheet'
    document.head.appendChild(link)
    return () => {
      document.head.removeChild(link)
    }
  }, [])

  const effects: { value: TextEffect; label: string }[] = [
    { value: 'none', label: 'None' },
    { value: 'shadow', label: 'Shadow' },
    { value: 'outline', label: 'Outline' },
    { value: 'glow', label: 'Glow' },
  ]

  const transforms: { value: TextTransform; label: string }[] = [
    { value: 'none', label: 'Normal' },
    { value: 'uppercase', label: 'UPPERCASE' },
    { value: 'lowercase', label: 'lowercase' },
    { value: 'capitalize', label: 'Capitalize' },
  ]

  const weights = [
    { value: '300', label: 'Light' },
    { value: '400', label: 'Regular' },
    { value: '500', label: 'Medium' },
    { value: '600', label: 'Semibold' },
    { value: '700', label: 'Bold' },
    { value: '800', label: 'Extra Bold' },
  ]

  return (
    <main className="min-h-screen p-4 sm:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold gradient-text">Text Logo Creator</h1>
        <p className="text-gray-400 mt-2">Style your text with beautiful fonts, colors, and effects</p>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
        {/* Preview Panel */}
        <div className="space-y-4">
          <div className="glass rounded-2xl p-4">
            <h2 className="text-sm font-medium text-gray-400 mb-4">Preview</h2>
            <LogoCanvas
              ref={canvasRef}
              text={text}
              font={font}
              fontSize={fontSize}
              fontWeight={fontWeight}
              textColor={textColor}
              backgroundColor={backgroundColor}
              letterSpacing={letterSpacing}
              textTransform={textTransform}
              effect={effect}
              gradient={useGradient ? { from: gradientFrom, to: gradientTo, direction: gradientDirection } : undefined}
              className="min-h-[300px]"
            />
          </div>

          <div className="flex justify-end">
            <DownloadButton canvasRef={canvasRef} filename="text-logo" />
          </div>
        </div>

        {/* Controls Panel */}
        <div className="glass rounded-2xl p-6 space-y-6">
          {/* Text Input */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Logo Text</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your logo text"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Font Selector */}
          <FontSelector value={font} onChange={setFont} />

          {/* Font Size & Weight */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Font Size: {fontSize}px</label>
              <input
                type="range"
                min="16"
                max="120"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full accent-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Weight</label>
              <select
                value={fontWeight}
                onChange={(e) => setFontWeight(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500"
              >
                {weights.map((w) => (
                  <option key={w.value} value={w.value} className="bg-gray-900">
                    {w.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Letter Spacing */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Letter Spacing: {letterSpacing}px</label>
            <input
              type="range"
              min="-5"
              max="30"
              value={letterSpacing}
              onChange={(e) => setLetterSpacing(Number(e.target.value))}
              className="w-full accent-purple-500"
            />
          </div>

          {/* Text Transform */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Text Transform</label>
            <div className="flex gap-2">
              {transforms.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTextTransform(t.value)}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    textTransform === t.value
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="grid grid-cols-2 gap-4">
            <ColorPicker label="Background" value={backgroundColor} onChange={setBackgroundColor} />
            {!useGradient && (
              <ColorPicker label="Text Color" value={textColor} onChange={setTextColor} />
            )}
          </div>

          {/* Gradient Toggle */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={useGradient}
                onChange={(e) => setUseGradient(e.target.checked)}
                className="w-5 h-5 accent-purple-500"
              />
              <span className="text-sm text-gray-400">Use Gradient Text</span>
            </label>

            {useGradient && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                <ColorPicker label="Gradient From" value={gradientFrom} onChange={setGradientFrom} />
                <ColorPicker label="Gradient To" value={gradientTo} onChange={setGradientTo} />
                <div className="col-span-2">
                  <label className="block text-sm text-gray-400 mb-2">Direction</label>
                  <select
                    value={gradientDirection}
                    onChange={(e) => setGradientDirection(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="0deg" className="bg-gray-900">To Top</option>
                    <option value="90deg" className="bg-gray-900">To Right</option>
                    <option value="135deg" className="bg-gray-900">Diagonal</option>
                    <option value="180deg" className="bg-gray-900">To Bottom</option>
                    <option value="270deg" className="bg-gray-900">To Left</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Text Effects */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Text Effect</label>
            <div className="grid grid-cols-4 gap-2">
              {effects.map((e) => (
                <button
                  key={e.value}
                  onClick={() => setEffect(e.value)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    effect === e.value
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {e.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
