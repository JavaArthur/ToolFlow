'use client'

import { Filter, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { Category } from '@/types'

interface FilterBarProps {
  categories: Category[]
  selectedCategory: string | undefined
  onCategoryChange: (category: string | undefined) => void
  selectedTags: string[]
  onTagToggle: (tag: string) => void
  allTags: string[]
}

export default function FilterBar({
  categories,
  selectedCategory,
  onCategoryChange,
  selectedTags,
  onTagToggle,
  allTags,
}: FilterBarProps) {
  const t = useTranslations('search')
  
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <Filter className="h-5 w-5 text-gray-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">{t('filters')}</span>
          </div>

          {/* Categories */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">{t('category')}</span>
            <button
              onClick={() => onCategoryChange(undefined)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                !selectedCategory
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t('all')}
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Popular Tags */}
          <div className="flex items-center space-x-2 flex-1">
            <span className="text-sm text-gray-500">{t('tags')}</span>
            <div className="flex flex-wrap gap-2">
              {allTags.slice(0, 8).map((tag) => (
                <button
                  key={tag}
                  onClick={() => onTagToggle(tag)}
                  className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          {(selectedCategory || selectedTags.length > 0) && (
            <button
              onClick={() => {
                onCategoryChange(undefined)
                selectedTags.forEach(tag => onTagToggle(tag))
              }}
              className="flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="h-4 w-4 mr-1" />
              {t('clearFilters')}
            </button>
          )}
        </div>

        {/* Active Filters Display */}
        {selectedTags.length > 0 && (
          <div className="mt-3 flex items-center space-x-2">
            <span className="text-xs text-gray-500">{t('selectedTags')}</span>
            {selectedTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700"
              >
                {tag}
                <button
                  onClick={() => onTagToggle(tag)}
                  className="ml-1 text-primary-500 hover:text-primary-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}