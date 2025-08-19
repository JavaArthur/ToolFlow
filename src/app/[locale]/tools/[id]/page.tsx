
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ExternalLink, Star, Calendar, ArrowLeft, Tag, Globe } from 'lucide-react'
import ToolLogo from '@/components/ToolLogo'
import { getTools } from '@/lib/data'
import type { Tool } from '@/types'

interface ToolDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function ToolDetailPage({ params }: ToolDetailPageProps) {
  const { id } = await params
  const tools = getTools()
  const tool = tools.find(t => t.id === id)
  
  if (!tool) {
    notFound()
  }

  const relatedTools = tools
    .filter(t => t.id !== tool.id && (
      t.category === tool.category || 
      t.tags.some(tag => tool.tags.includes(tag))
    ))
    .slice(0, 4)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getPricingColor = (pricing: string | undefined) => {
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center mb-4">
            <Link 
              href="/"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mr-4"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              返回首页
            </Link>
            <nav className="text-sm text-gray-500">
              <span>工具详情</span>
              <span className="mx-2">/</span>
              <span>{tool.name}</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tool Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center">
                <ToolLogo 
                  name={tool.name} 
                  url={tool.url} 
                  size="lg" 
                />
                <div className="ml-6">
                  <div className="flex items-center mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{tool.name}</h1>
                    {tool.featured && (
                      <div className="ml-3 flex items-center">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm font-medium text-yellow-600">精选推荐</span>
                      </div>
                    )}
                  </div>
                  <p className="text-lg text-gray-600">{tool.category}</p>
                  <div className="flex items-center mt-2 space-x-4">
                    {tool.pricing && (
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPricingColor(tool.pricing)}`}>
                        {tool.pricing}
                      </span>
                    )}
                    {tool.rating && (
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm font-medium text-gray-700">{tool.rating} 分</span>
                      </div>
                    )}
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(tool.addedAt)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">工具简介</h2>
              <p className="text-gray-700 leading-relaxed">{tool.description}</p>
            </div>

            {/* Tags */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                <Tag className="h-5 w-5 mr-2" />
                相关标签
              </h2>
              <div className="flex flex-wrap gap-2">
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-primary-100 text-primary-700 hover:bg-primary-200 transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-6 border-t border-gray-200">
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors group"
              >
                <Globe className="h-5 w-5 mr-2" />
                访问 {tool.name}
                <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <p className="mt-2 text-sm text-gray-500">
                点击访问官方网站了解更多信息
              </p>
            </div>
          </div>
        </div>

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">相关推荐</h2>
              <p className="text-sm text-gray-600 mt-1">你可能感兴趣的其他工具</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedTools.map((relatedTool) => (
                  <Link
                    key={relatedTool.id}
                    href={`/tools/${relatedTool.id}`}
                    className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all group"
                  >
                    <ToolLogo 
                      name={relatedTool.name} 
                      url={relatedTool.url} 
                      size="md"
                      className="flex-shrink-0"
                    />
                    <div className="ml-4 flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                        {relatedTool.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {relatedTool.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}