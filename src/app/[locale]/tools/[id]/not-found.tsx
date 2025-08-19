import Link from 'next/link'
import { ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-gray-400 mb-8">
          <Search className="mx-auto h-24 w-24" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">工具未找到</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          抱歉，我们没有找到您要查看的工具。可能该工具不存在或已被移除。
        </p>
        <div className="space-x-4">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            返回首页
          </Link>
          <Link
            href="/?search="
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Search className="h-5 w-5 mr-2" />
            搜索工具
          </Link>
        </div>
      </div>
    </div>
  )
}