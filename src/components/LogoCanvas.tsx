'use client'

import { forwardRef } from 'react'

export interface LogoCanvasProps {
  text: string
  font: string
  fontSize: number
  fontWeight: string
  textColor: string
  backgroundColor: string
  letterSpacing: number
  textTransform: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
  effect: 'none' | 'shadow' | 'outline' | 'glow'
  gradient?: { from: string; to: string; direction: string }
  icon?: {
    path: string
    color: string
    position: 'left' | 'right' | 'top'
    size?: number
  }
  className?: string
}

const LogoCanvas = forwardRef<HTMLDivElement, LogoCanvasProps>(
  (
    {
      text,
      font,
      fontSize,
      fontWeight,
      textColor,
      backgroundColor,
      letterSpacing,
      textTransform,
      effect,
      gradient,
      icon,
      className = '',
    },
    ref
  ) => {
    const getTextStyle = (): React.CSSProperties => {
      const baseStyle: React.CSSProperties = {
        fontFamily: font,
        fontSize: `${fontSize}px`,
        fontWeight: fontWeight as React.CSSProperties['fontWeight'],
        letterSpacing: `${letterSpacing}px`,
        textTransform: textTransform,
        lineHeight: 1.2,
      }

      if (gradient) {
        baseStyle.background = `linear-gradient(${gradient.direction}, ${gradient.from}, ${gradient.to})`
        baseStyle.WebkitBackgroundClip = 'text'
        baseStyle.WebkitTextFillColor = 'transparent'
        baseStyle.backgroundClip = 'text'
      } else {
        baseStyle.color = textColor
      }

      switch (effect) {
        case 'shadow':
          baseStyle.textShadow = '4px 4px 8px rgba(0,0,0,0.3)'
          break
        case 'outline':
          baseStyle.WebkitTextStroke = `2px ${textColor}`
          baseStyle.WebkitTextFillColor = 'transparent'
          break
        case 'glow':
          baseStyle.textShadow = `0 0 10px ${textColor}, 0 0 20px ${textColor}, 0 0 30px ${textColor}`
          break
      }

      return baseStyle
    }

    const iconSize = icon?.size || fontSize * 0.8

    const renderIcon = () => {
      if (!icon) return null

      return (
        <svg
          data-logo-icon
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke={icon.color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="flex-shrink-0"
        >
          <path d={icon.path} />
        </svg>
      )
    }

    const containerClass = icon?.position === 'top' ? 'flex-col' : 'flex-row'
    const gap = icon?.position === 'top' ? 'gap-4' : 'gap-3'

    return (
      <div
        ref={ref}
        className={`flex items-center justify-center p-8 rounded-xl ${className}`}
        style={{ backgroundColor, minHeight: '200px' }}
      >
        <div className={`flex items-center justify-center ${containerClass} ${gap}`}>
          {icon && icon.position !== 'right' && renderIcon()}
          <span data-logo-text style={getTextStyle()}>
            {text || 'Your Logo'}
          </span>
          {icon && icon.position === 'right' && renderIcon()}
        </div>
      </div>
    )
  }
)

LogoCanvas.displayName = 'LogoCanvas'

export default LogoCanvas
