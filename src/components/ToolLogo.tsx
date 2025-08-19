'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ToolLogoProps {
  name: string
  url: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function ToolLogo({ name, url, size = 'md', className = '' }: ToolLogoProps) {
  const [hasError, setHasError] = useState(false)

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-lg', 
    lg: 'w-20 h-20 text-3xl'
  }

  // 提取域名
  const getDomain = (urlString: string) => {
    try {
      const urlObj = new URL(urlString)
      return urlObj.hostname.replace('www.', '')
    } catch {
      return ''
    }
  }

  const domain = getDomain(url)
  const fallbackLetter = name.charAt(0).toUpperCase()

  // 如果加载失败或没有域名，显示字母头像
  if (hasError || !domain) {
    return (
      <div className={`${sizeClasses[size]} bg-primary-100 rounded-lg flex items-center justify-center ${className}`}>
        <span className="text-primary-600 font-semibold">
          {fallbackLetter}
        </span>
      </div>
    )
  }

  // Google Favicon API - 可靠且高质量
  const logoUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`

  return (
    <div className={`${sizeClasses[size]} rounded-lg overflow-hidden flex items-center justify-center ${className}`}>
      <Image
        src={logoUrl}
        alt={`${name} logo`}
        width={size === 'lg' ? 80 : size === 'md' ? 40 : 32}
        height={size === 'lg' ? 80 : size === 'md' ? 40 : 32}
        className="object-contain"
        onError={() => setHasError(true)}
        unoptimized // 允许外部图片
      />
    </div>
  )
}