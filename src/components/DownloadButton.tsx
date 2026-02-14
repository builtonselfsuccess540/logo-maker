'use client'

import { useState } from 'react'
import { Download, ChevronDown } from 'lucide-react'
import html2canvas from 'html2canvas'

interface DownloadButtonProps {
  canvasRef: React.RefObject<HTMLDivElement | null>
  filename?: string
}

export default function DownloadButton({ canvasRef, filename = 'logo' }: DownloadButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const downloadAsPNG = async () => {
    if (!canvasRef.current) return

    setIsDownloading(true)
    try {
      const canvas = await html2canvas(canvasRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        logging: false,
      })

      const link = document.createElement('a')
      link.download = `${filename}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (error) {
      console.error('Error downloading PNG:', error)
    }
    setIsDownloading(false)
    setIsOpen(false)
  }

  const downloadAsSVG = () => {
    if (!canvasRef.current) return

    setIsDownloading(true)
    try {
      const element = canvasRef.current
      const rect = element.getBoundingClientRect()

      // Get computed styles
      const computedStyle = window.getComputedStyle(element)
      const bgColor = computedStyle.backgroundColor

      // Build SVG from the canvas content
      let svgContent = ''
      const textElements = element.querySelectorAll('[data-logo-text]')
      const iconElements = element.querySelectorAll('[data-logo-icon]')

      textElements.forEach((el) => {
        const textEl = el as HTMLElement
        const style = window.getComputedStyle(textEl)
        const text = textEl.textContent || ''

        svgContent += `<text
          x="50%"
          y="50%"
          dominant-baseline="middle"
          text-anchor="middle"
          font-family="${style.fontFamily}"
          font-size="${style.fontSize}"
          font-weight="${style.fontWeight}"
          fill="${style.color}"
          letter-spacing="${style.letterSpacing}"
        >${text}</text>`
      })

      iconElements.forEach((el) => {
        const iconEl = el as SVGElement
        const paths = iconEl.querySelectorAll('path')
        paths.forEach((path) => {
          svgContent += path.outerHTML
        })
      })

      const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${rect.width}" height="${rect.height}" viewBox="0 0 ${rect.width} ${rect.height}">
  <rect width="100%" height="100%" fill="${bgColor}"/>
  ${svgContent}
</svg>`

      const blob = new Blob([svg], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.download = `${filename}.svg`
      link.href = url
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading SVG:', error)
    }
    setIsDownloading(false)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isDownloading}
        className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        <Download className="w-5 h-5" />
        {isDownloading ? 'Downloading...' : 'Download'}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 bg-gray-900 border border-white/10 rounded-xl shadow-xl z-20 overflow-hidden min-w-[160px]">
            <button
              onClick={downloadAsPNG}
              className="w-full text-left px-4 py-3 hover:bg-white/10 text-white transition-colors flex items-center gap-2"
            >
              <span className="text-xs bg-blue-500 px-2 py-0.5 rounded font-semibold">PNG</span>
              High Quality
            </button>
            <button
              onClick={downloadAsSVG}
              className="w-full text-left px-4 py-3 hover:bg-white/10 text-white transition-colors flex items-center gap-2"
            >
              <span className="text-xs bg-green-500 px-2 py-0.5 rounded font-semibold">SVG</span>
              Vector Format
            </button>
          </div>
        </>
      )}
    </div>
  )
}
