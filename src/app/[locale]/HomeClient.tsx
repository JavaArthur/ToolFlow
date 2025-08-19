'use client'

import { useState, useMemo } from 'react'
import { NextIntlClientProvider, useTranslations } from 'next-intl'
import Header from '@/components/Header'
import ToolCard from '@/components/ToolCard'
import FilterBar from '@/components/FilterBar'
import type { Tool, Category } from '@/types'

interface HomeClientProps {
  tools: Tool[]
  categories: Category[]
  allTags: string[]
  featuredTools: Tool[]
  messages: Record<string, any>
  locale: string
}

function HomeContent({ 
  tools, 
  categories, 
  allTags, 
  featuredTools 
}: Omit<HomeClientProps, 'messages' | 'locale'>) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  
  const t = useTranslations('hero')
  const sections = useTranslations('sections')
  const sort = useTranslations('sort')
  const empty = useTranslations('empty')
  const actions = useTranslations('actions')
  const footer = useTranslations('footer')

  // Filter tools based on search criteria
  const filteredTools = useMemo(() => {
    return tools.filter((tool: Tool) => {
      const matchesSearch = searchQuery === '' || 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesCategory = !selectedCategory || tool.category === selectedCategory
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => tool.tags.includes(tag))
      
      return matchesSearch && matchesCategory && matchesTags
    })
  }, [tools, searchQuery, selectedCategory, selectedTags])

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedCategory(undefined)
    setSelectedTags([])
  }

  const handleTagSelect = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const hasActiveFilters = searchQuery || selectedCategory || selectedTags.length > 0
  const showingResults = hasActiveFilters

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header 
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
      />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t('description')}
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="text-3xl font-bold text-blue-600 mb-2">{tools.length}+</div>
              <div className="text-gray-600">{t('stats.tools')}</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="text-3xl font-bold text-purple-600 mb-2">{categories.length}</div>
              <div className="text-gray-600">{t('stats.categories')}</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="text-3xl font-bold text-green-600 mb-2">{t('stats.updates')}</div>
              <div className="text-gray-600">{t('stats.updatesDesc')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          <FilterBar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedTags={selectedTags}
            onTagToggle={handleTagSelect}
            allTags={allTags}
          />
        </div>
      </section>

      {/* Featured Tools Section */}
      {!showingResults && (
        <section className="px-4 pb-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {sections('featured')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTools.map((tool: Tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Tools Section */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {showingResults ? sections('searchResults') : sections('all')}
          </h2>
          
          {filteredTools.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">{empty('title')}</h3>
              <p className="text-gray-500 mb-6">{empty('description')}</p>
              <button
                onClick={handleClearFilters}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {actions('clearFilters')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool: Tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">{footer('about')}</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              {footer('aboutDesc')}
            </p>
            <p className="text-sm text-gray-500">
              {footer('copyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function HomeClient({ 
  tools, 
  categories, 
  allTags, 
  featuredTools, 
  messages, 
  locale 
}: HomeClientProps) {
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <HomeContent 
        tools={tools}
        categories={categories}
        allTags={allTags}
        featuredTools={featuredTools}
      />
    </NextIntlClientProvider>
  )
}