'use client'

import Link from 'next/link'
import { Sparkles, Type, LayoutGrid, Layers } from 'lucide-react'

const features = [
  {
    title: 'AI-Powered Generator',
    description: 'Describe your vision and let AI create unique logo concepts for you. Perfect for quick inspiration.',
    icon: Sparkles,
    href: '/ai-generator',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Text Logo Creator',
    description: 'Style your text with beautiful fonts, colors, and effects. Create typography-based logos easily.',
    icon: Type,
    href: '/text-logo',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Template Gallery',
    description: 'Browse pre-designed templates and customize them to match your brand. Quick and professional.',
    icon: LayoutGrid,
    href: '/templates',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Icon + Text Combo',
    description: 'Combine icons with styled text to create balanced, memorable logos. Mix and match freely.',
    icon: Layers,
    href: '/icon-combo',
    gradient: 'from-orange-500 to-yellow-500',
  },
]

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none" />

        <div className="relative mx-auto max-w-5xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="gradient-text">Logo Maker</span>
          </h1>
          <p className="mt-6 text-lg text-gray-300 sm:text-xl max-w-2xl mx-auto">
            Create professional logos for your brand in minutes.
            AI-powered generation, text styling, templates, and more.
            <span className="text-green-400 font-semibold"> Completely free.</span>
          </p>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {features.map((feature, index) => (
              <Link
                key={feature.title}
                href={feature.href}
                className="group relative overflow-hidden rounded-2xl glass p-6 transition-all duration-300 hover:scale-[1.02] hover:bg-white/10"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                <div className="relative">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-white">
                    {feature.title}
                  </h2>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    {feature.description}
                  </p>

                  {/* Arrow */}
                  <div className="mt-4 flex items-center text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                    Get started
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 text-center text-gray-500 text-sm">
        <p>Built with Next.js and AI</p>
      </footer>
    </main>
  )
}
