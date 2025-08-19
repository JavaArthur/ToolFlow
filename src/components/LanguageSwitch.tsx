'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { Globe } from 'lucide-react'

export default function LanguageSwitch() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLanguage = () => {
    const newLocale = locale === 'zh' ? 'en' : 'zh'
    
    // Remove current locale from pathname
    const pathnameWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/'
    
    // Add new locale to pathname
    const newPath = `/${newLocale}${pathnameWithoutLocale === '/' ? '' : pathnameWithoutLocale}`
    
    router.push(newPath)
  }

  return (
    <button
      onClick={switchLanguage}
      className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      title={locale === 'zh' ? '切换到英文' : 'Switch to Chinese'}
    >
      <Globe className="h-4 w-4" />
      <span className="font-medium">
        {locale === 'zh' ? 'EN' : '中文'}
      </span>
    </button>
  )
}