import HomeClient from './HomeClient'
import { getMessages } from 'next-intl/server'
import { getTools, getCategories, getAllTags, getFeaturedTools } from '@/lib/data'

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  
  // Get server-side data
  const tools = getTools(locale)
  const categories = getCategories(locale)
  const allTags = getAllTags(locale)
  const featuredTools = getFeaturedTools(locale)
  const messages = await getMessages()

  return (
    <HomeClient 
      tools={tools}
      categories={categories}
      allTags={allTags}
      featuredTools={featuredTools}
      messages={messages}
      locale={locale}
    />
  )
}