'use client'

import { useState, useEffect } from 'react'
import { fonts, fontCategories, getGoogleFontsUrl } from '@/lib/fonts'
import { ChevronDown } from 'lucide-react'

interface FontSelectorProps {
  value: string
  onChange: (font: string) => void
}

export default function FontSelector({ value, onChange }: FontSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [category, setCategory] = useState<(typeof fontCategories)[number]>('all')
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    const link = document.createElement('link')
    link.href = getGoogleFontsUrl()
    link.rel = 'stylesheet'
    link.onload = () => setFontsLoaded(true)
    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link)
    }
  }, [])

  const filteredFonts = category === 'all'
    ? fonts
    : fonts.filter((f) => f.category === category)

  const selectedFont = fonts.find((f) => f.value === value)

  return (
    <div className="relative">
      <label className="block text-sm text-gray-400 mb-2">Font</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white hover:bg-white/10 transition-colors"
      >
        <span style={{ fontFamily: value }}>{selectedFont?.name || 'Select font'}</span>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-white/10 rounded-xl shadow-xl z-20 max-h-80 overflow-hidden">
            {/* Category tabs */}
            <div className="flex gap-1 p-2 border-b border-white/10 overflow-x-auto">
              {fontCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1 text-sm rounded-lg whitespace-nowrap transition-colors ${
                    category === cat
                      ? 'bg-purple-500 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            {/* Font list */}
            <div className="overflow-y-auto max-h-60">
              {filteredFonts.map((font) => (
                <button
                  key={font.name}
                  onClick={() => {
                    onChange(font.value)
                    setIsOpen(false)
                  }}
                  className={`w-full text-left px-4 py-3 hover:bg-white/10 transition-colors ${
                    value === font.value ? 'bg-purple-500/20 text-purple-300' : 'text-white'
                  }`}
                >
                  <span
                    style={{ fontFamily: fontsLoaded ? font.value : 'inherit' }}
                    className="text-lg"
                  >
                    {font.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
