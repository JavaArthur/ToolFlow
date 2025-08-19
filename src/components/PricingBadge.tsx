'use client'

import { useTranslations } from 'next-intl'

interface PricingBadgeProps {
  pricing: string | undefined
  className?: string
}

export default function PricingBadge({ pricing, className = '' }: PricingBadgeProps) {
  const t = useTranslations('pricing')
  
  if (!pricing) return null

  const getPricingColor = (pricing: string) => {
    switch (pricing) {
      case 'Free':
        return 'bg-green-100 text-green-800'
      case 'Freemium':
        return 'bg-blue-100 text-blue-800'
      case 'Paid':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPricingColor(pricing)} ${className}`}>
      {t(pricing as any)}
    </span>
  )
}