export interface Tool {
  id: string
  name: string
  description: string
  url: string
  tags: string[]
  category: string
  addedAt: string
  featured?: boolean
  logo?: string
  pricing?: 'Free' | 'Freemium' | 'Paid'
  rating?: number
}

export interface Category {
  id: string
  name: string
  description: string
  icon?: string
  color?: string
}

export interface SearchFilters {
  query: string
  category?: string
  tags: string[]
  pricing?: string
}