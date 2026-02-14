'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import LogoCanvas from '@/components/LogoCanvas'
import ColorPicker from '@/components/ColorPicker'
import FontSelector from '@/components/FontSelector'
import DownloadButton from '@/components/DownloadButton'
import IconGrid from '@/components/IconGrid'
import { getGoogleFontsUrl } from '@/lib/fonts'
import type { IconData } from '@/lib/icons'

type IconPosition = 'left' | 'right' | 'top'

export default function IconComboPage() {
  const canvasRef = useRef<HTMLDivElement>(null)

  const [text, setText] = useState('Brand Name')
  const [font, setFont] = useState('Poppins, sans-serif')
  const [fontSize, setFontSize] = useState(42)
  const [fontWeight, setFontWeight] = useState('600')
  const [textColor, setTextColor] = useState('#ffffff')
  const [backgroundColor, setBackgroundColor] = useState('#1a1a2e')
  const [letterSpacing, setLetterSpacing] = useState(1)
  const [selectedIcon, setSelectedIcon] = useState<IconData | null>(null)
  const [iconColor, setIconColor] = useState('#3b82f6')
  const [iconPosition, setIconPosition] = useState<IconPosition>('left')
  const [iconSize, setIconSize] = useState(40)

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

  const positions: { value: IconPosition; label: string }[] = [
    { value: 'left', label: 'Left' },
    { value: 'top', label: 'Top' },
    { value: 'right', label: 'Right' },
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
        <h1 className="text-3xl font-bold gradient-text">Icon + Text Combo</h1>
        <p className="text-gray-400 mt-2">Combine icons with styled text to create memorable logos</p>
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
              textTransform="none"
              effect="none"
              icon={selectedIcon ? {
                path: selectedIcon.path,
                color: iconColor,
                position: iconPosition,
                size: iconSize,
              } : undefined}
              className="min-h-[300px]"
            />
          </div>

          <div className="flex justify-end">
            <DownloadButton canvasRef={canvasRef} filename="icon-logo" />
          </div>
        </div>

        {/* Controls Panel */}
        <div className="glass rounded-2xl p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Icon Selection */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-3">Select Icon</h3>
            <IconGrid selectedIcon={selectedIcon} onSelect={setSelectedIcon} />
          </div>

          {/* Icon Settings */}
          {selectedIcon && (
            <div className="space-y-4 pt-4 border-t border-white/10">
              <h3 className="text-sm font-medium text-gray-400">Icon Settings</h3>

              <ColorPicker label="Icon Color" value={iconColor} onChange={setIconColor} />

              <div>
                <label className="block text-sm text-gray-400 mb-2">Icon Size: {iconSize}px</label>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={iconSize}
                  onChange={(e) => setIconSize(Number(e.target.value))}
                  className="w-full accent-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Icon Position</label>
                <div className="flex gap-2">
                  {positions.map((p) => (
                    <button
                      key={p.value}
                      onClick={() => setIconPosition(p.value)}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        iconPosition === p.value
                          ? 'bg-purple-500 text-white'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Text Settings */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h3 className="text-sm font-medium text-gray-400">Text Settings</h3>

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

            <FontSelector value={font} onChange={setFont} />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Font Size: {fontSize}px</label>
                <input
                  type="range"
                  min="16"
                  max="80"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full accent-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Spacing: {letterSpacing}px</label>
                <input
                  type="range"
                  min="-5"
                  max="20"
                  value={letterSpacing}
                  onChange={(e) => setLetterSpacing(Number(e.target.value))}
                  className="w-full accent-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Weight</label>
              <select
                value={fontWeight}
                onChange={(e) => setFontWeight(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500"
              >
                <option value="300" className="bg-gray-900">Light</option>
                <option value="400" className="bg-gray-900">Regular</option>
                <option value="500" className="bg-gray-900">Medium</option>
                <option value="600" className="bg-gray-900">Semibold</option>
                <option value="700" className="bg-gray-900">Bold</option>
                <option value="800" className="bg-gray-900">Extra Bold</option>
              </select>
            </div>
          </div>

          {/* Colors */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h3 className="text-sm font-medium text-gray-400">Colors</h3>
            <div className="grid grid-cols-2 gap-4">
              <ColorPicker label="Text Color" value={textColor} onChange={setTextColor} />
              <ColorPicker label="Background" value={backgroundColor} onChange={setBackgroundColor} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
