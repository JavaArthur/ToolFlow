import type { Tool, Category } from '@/types'

// Import language-specific data
import toolsZh from '@/data/tools.json'
import categoriesZh from '@/data/categories.json'
import toolsEn from '@/data/tools-en.json'
import categoriesEn from '@/data/categories-en.json'

export function getTools(locale: string = 'zh'): Tool[] {
  const tools = locale === 'en' ? (toolsEn as Tool[]) : (toolsZh as Tool[])
  return tools
}

export function getCategories(locale: string = 'zh'): Category[] {
  const categories = locale === 'en' ? (categoriesEn as Category[]) : (categoriesZh as Category[])
  return categories
}

export function getFeaturedTools(locale: string = 'zh'): Tool[] {
  const tools = getTools(locale)
  return tools.filter(tool => tool.featured)
}

export function getToolsByCategory(categoryId: string, locale: string = 'zh'): Tool[] {
  const tools = getTools(locale)
  return tools.filter(tool => tool.category === categoryId)
}

export function searchTools(query: string, locale: string = 'zh'): Tool[] {
  const tools = getTools(locale)
  const lowercaseQuery = query.toLowerCase()
  return tools.filter(tool => 
    tool.name.toLowerCase().includes(lowercaseQuery) ||
    tool.description.toLowerCase().includes(lowercaseQuery) ||
    tool.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}

export function getToolsByTags(tags: string[], locale: string = 'zh'): Tool[] {
  const tools = getTools(locale)
  if (tags.length === 0) return tools
  return tools.filter(tool => 
    tags.some(tag => tool.tags.includes(tag))
  )
}

export function getAllTags(locale: string = 'zh'): string[] {
  const tools = getTools(locale)
  const tagSet = new Set<string>()
  tools.forEach(tool => {
    tool.tags.forEach(tag => tagSet.add(tag))
  })
  return Array.from(tagSet).sort()
}

export function getPopularTags(limit: number = 10, locale: string = 'zh'): string[] {
  const tools = getTools(locale)
  const tagCounts = new Map<string, number>()
  
  tools.forEach(tool => {
    tool.tags.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
    })
  })
  
  return Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag]) => tag)
}