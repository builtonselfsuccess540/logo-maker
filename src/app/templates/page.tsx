'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, X } from 'lucide-react'
import LogoCanvas from '@/components/LogoCanvas'
import ColorPicker from '@/components/ColorPicker'
import FontSelector from '@/components/FontSelector'
import DownloadButton from '@/components/DownloadButton'
import { templates, templateCategories, type LogoTemplate } from '@/lib/templates'
import { getGoogleFontsUrl } from '@/lib/fonts'

export default function TemplatesPage() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [category, setCategory] = useState<(typeof templateCategories)[number]>('all')
  const [selectedTemplate, setSelectedTemplate] = useState<LogoTemplate | null>(null)
  const [editedTemplate, setEditedTemplate] = useState<LogoTemplate | null>(null)

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

  const filteredTemplates = category === 'all'
    ? templates
    : templates.filter((t) => t.category === category)

  const openEditor = (template: LogoTemplate) => {
    setSelectedTemplate(template)
    setEditedTemplate({ ...template })
  }

  const closeEditor = () => {
    setSelectedTemplate(null)
    setEditedTemplate(null)
  }

  const updateTemplate = (updates: Partial<LogoTemplate>) => {
    if (editedTemplate) {
      setEditedTemplate({ ...editedTemplate, ...updates })
    }
  }

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
        <h1 className="text-3xl font-bold gradient-text">Template Gallery</h1>
        <p className="text-gray-400 mt-2">Browse pre-designed templates and customize them to match your brand</p>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {templateCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                category === cat
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Template Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <button
              key={template.id}
              onClick={() => openEditor(template)}
              className="group glass rounded-xl overflow-hidden transition-all hover:scale-[1.02] hover:bg-white/10 text-left"
            >
              {/* Template Preview */}
              <div
                className="p-6 flex items-center justify-center min-h-[160px]"
                style={{ backgroundColor: template.backgroundColor }}
              >
                <div className={`flex items-center gap-3 ${template.hasIcon && template.iconPosition === 'top' ? 'flex-col' : ''}`}>
                  {template.hasIcon && template.iconPath && template.iconPosition !== 'right' && (
                    <svg
                      width={32}
                      height={32}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={template.iconColor}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={template.iconPath} />
                    </svg>
                  )}
                  <span
                    style={{
                      fontFamily: template.font,
                      fontSize: `${Math.min(template.fontSize * 0.6, 32)}px`,
                      fontWeight: template.fontWeight,
                      color: template.gradient ? undefined : template.textColor,
                      letterSpacing: `${template.letterSpacing * 0.6}px`,
                      textTransform: template.textTransform,
                      background: template.gradient
                        ? `linear-gradient(${template.gradient.direction}, ${template.gradient.from}, ${template.gradient.to})`
                        : undefined,
                      WebkitBackgroundClip: template.gradient ? 'text' : undefined,
                      WebkitTextFillColor: template.gradient ? 'transparent' : undefined,
                      textShadow: template.effect === 'shadow' ? '2px 2px 4px rgba(0,0,0,0.3)' : template.effect === 'glow' ? `0 0 10px ${template.textColor}` : undefined,
                    }}
                  >
                    {template.text}
                  </span>
                  {template.hasIcon && template.iconPath && template.iconPosition === 'right' && (
                    <svg
                      width={32}
                      height={32}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={template.iconColor}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={template.iconPath} />
                    </svg>
                  )}
                </div>
              </div>

              {/* Template Info */}
              <div className="p-4 border-t border-white/5">
                <h3 className="font-medium text-white">{template.name}</h3>
                <p className="text-sm text-gray-500 capitalize">{template.category}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Editor Modal */}
      {selectedTemplate && editedTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="bg-gray-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-xl font-semibold text-white">Customize Template</h2>
              <button
                onClick={closeEditor}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-auto p-4">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Preview */}
                <div className="space-y-4">
                  <LogoCanvas
                    ref={canvasRef}
                    text={editedTemplate.text}
                    font={editedTemplate.font}
                    fontSize={editedTemplate.fontSize}
                    fontWeight={editedTemplate.fontWeight}
                    textColor={editedTemplate.textColor}
                    backgroundColor={editedTemplate.backgroundColor}
                    letterSpacing={editedTemplate.letterSpacing}
                    textTransform={editedTemplate.textTransform}
                    effect={editedTemplate.effect || 'none'}
                    gradient={editedTemplate.gradient}
                    icon={editedTemplate.hasIcon && editedTemplate.iconPath ? {
                      path: editedTemplate.iconPath,
                      color: editedTemplate.iconColor || '#ffffff',
                      position: editedTemplate.iconPosition || 'left',
                    } : undefined}
                    className="min-h-[250px]"
                  />
                  <div className="flex justify-end">
                    <DownloadButton canvasRef={canvasRef} filename={editedTemplate.id} />
                  </div>
                </div>

                {/* Controls */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Logo Text</label>
                    <input
                      type="text"
                      value={editedTemplate.text}
                      onChange={(e) => updateTemplate({ text: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <FontSelector
                    value={editedTemplate.font}
                    onChange={(font) => updateTemplate({ font })}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Font Size</label>
                      <input
                        type="range"
                        min="16"
                        max="80"
                        value={editedTemplate.fontSize}
                        onChange={(e) => updateTemplate({ fontSize: Number(e.target.value) })}
                        className="w-full accent-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Spacing</label>
                      <input
                        type="range"
                        min="-5"
                        max="20"
                        value={editedTemplate.letterSpacing}
                        onChange={(e) => updateTemplate({ letterSpacing: Number(e.target.value) })}
                        className="w-full accent-purple-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <ColorPicker
                      label="Text Color"
                      value={editedTemplate.textColor}
                      onChange={(textColor) => updateTemplate({ textColor, gradient: undefined })}
                    />
                    <ColorPicker
                      label="Background"
                      value={editedTemplate.backgroundColor}
                      onChange={(backgroundColor) => updateTemplate({ backgroundColor })}
                    />
                  </div>

                  {editedTemplate.hasIcon && (
                    <ColorPicker
                      label="Icon Color"
                      value={editedTemplate.iconColor || '#ffffff'}
                      onChange={(iconColor) => updateTemplate({ iconColor })}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
