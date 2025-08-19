'use client'

import { Search, Star, Github } from 'lucide-react'
import { useTranslations } from 'next-intl'
import LanguageSwitch from './LanguageSwitch'

interface HeaderProps {
  onSearchChange: (query: string) => void
  searchQuery: string
}

export default function Header({ onSearchChange, searchQuery }: HeaderProps) {
  const t = useTranslations('search')
  const nav = useTranslations('navigation')
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="h-8 w-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <Star className="h-5 w-5 text-white" />
              </div>
              <h1 className="ml-3 text-xl font-bold text-gray-900">
                ToolFlow
              </h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 focus:bg-white sm:text-sm"
                placeholder={t('placeholder')}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <LanguageSwitch />
            <a
              href="https://github.com/your-username/toolflow"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <Github className="h-6 w-6" />
            </a>
            <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
              {nav('submit')}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}