import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ToolFlow - AI Tools Collection',
  description: 'Curated AI tools collection to help you discover and use the best AI tools',
  keywords: 'AI tools, artificial intelligence, tools, workflow, automation',
  authors: [{ name: 'ToolFlow' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="scroll-smooth">
      <body className={`${inter.className} min-h-screen bg-gray-50`}>
        <div className="flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}