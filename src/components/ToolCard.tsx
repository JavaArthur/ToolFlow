'use client'

import { ExternalLink, Star, Calendar } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import ToolLogo from './ToolLogo'
import PricingBadge from './PricingBadge'
import type { Tool } from '@/types'

interface ToolCardProps {
  tool: Tool
}

export default function ToolCard({ tool }: ToolCardProps) {
  const t = useTranslations('tool')
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200 group">
      <Link href={`/tools/${tool.id}`} className="block">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center">
              <ToolLogo 
                name={tool.name} 
                url={tool.url} 
                size="md" 
              />
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {tool.name}
                </h3>
                <span className="text-sm text-gray-500">{tool.category}</span>
              </div>
            </div>
            {tool.featured && (
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {tool.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tool.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
              >
                {tag}
              </span>
            ))}
            {tool.tags.length > 4 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                +{tool.tags.length - 4}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <PricingBadge pricing={tool.pricing} />
              {tool.rating && (
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm text-gray-600">{tool.rating}</span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="h-3 w-3 mr-1" />
                {formatDate(tool.addedAt)}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(tool.url, '_blank', 'noopener,noreferrer')
                }}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-primary-500 hover:text-primary-600 transition-all duration-200 group/link"
              >
                {t('visit')}
                <ExternalLink className="ml-1 h-3 w-3 group-hover/link:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}