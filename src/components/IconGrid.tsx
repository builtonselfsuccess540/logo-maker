'use client'

import { useState } from 'react'
import { icons, iconCategories, type IconData } from '@/lib/icons'

interface IconGridProps {
  selectedIcon: IconData | null
  onSelect: (icon: IconData | null) => void
}

export default function IconGrid({ selectedIcon, onSelect }: IconGridProps) {
  const [category, setCategory] = useState<(typeof iconCategories)[number]>('all')
  const [search, setSearch] = useState('')

  const filteredIcons = icons.filter((icon) => {
    const matchesCategory = category === 'all' || icon.category === category
    const matchesSearch = icon.name.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search icons..."
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
        />

        {/* Clear selection button */}
        {selectedIcon && (
          <button
            onClick={() => onSelect(null)}
            className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
          >
            Clear Icon
          </button>
        )}
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {iconCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1.5 text-sm rounded-lg whitespace-nowrap transition-colors ${
              category === cat
                ? 'bg-purple-500 text-white'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Icon grid */}
      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2 max-h-64 overflow-y-auto p-1">
        {filteredIcons.map((icon) => (
          <button
            key={icon.name}
            onClick={() => onSelect(icon)}
            title={icon.name}
            className={`aspect-square flex items-center justify-center rounded-lg transition-all ${
              selectedIcon?.name === icon.name
                ? 'bg-purple-500 text-white ring-2 ring-purple-400'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={icon.path} />
            </svg>
          </button>
        ))}
      </div>

      {filteredIcons.length === 0 && (
        <p className="text-center text-gray-500 py-4">No icons found</p>
      )}
    </div>
  )
}
