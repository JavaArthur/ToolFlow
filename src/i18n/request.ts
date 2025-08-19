import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

// Can be imported from a shared config
const locales = ['en', 'zh']

export default getRequestConfig(async ({ locale }) => {
  // Handle undefined locale (fallback to default)
  const fallbackLocale = locale || 'zh'
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(fallbackLocale as any)) {
    return {
      locale: 'zh',
      messages: (await import(`../messages/zh.json`)).default
    }
  }

  return {
    locale: fallbackLocale,
    messages: (await import(`../messages/${fallbackLocale}.json`)).default
  }
})