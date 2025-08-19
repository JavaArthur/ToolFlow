# ToolFlow

🚀 精心策划的 AI 工具收藏站

## ✨ 项目简介

ToolFlow 不是又一个工具导航站，而是经过实践检验的精选集。我们帮助你发现真正有用的 AI 工具，构建高效的自动化工作流。

### 🌐 多语言支持
- 🇨🇳 中文 (简体)
- 🇺🇸 English
- 🔄 语言自动检测和切换

## 🎯 核心功能

- **精选推荐** - 人工筛选，每个工具都经过实践验证
- **智能搜索** - 支持名称、描述、标签多维度搜索  
- **分类筛选** - 8大类别，快速找到所需工具
- **标签系统** - 细粒度标签，精准定位
- **工具详情** - 详细介绍，相关推荐
- **国际化** - 完整的中英文双语支持
- **响应式设计** - 完美适配桌面端和移动端
- **SEO 优化** - 搜索引擎友好的页面结构

## 🛠️ 技术栈

- **前端框架**: Next.js 15 (App Router)
- **国际化**: next-intl v4
- **样式方案**: Tailwind CSS
- **语言**: TypeScript
- **图标**: Lucide React  
- **部署**: Vercel

## 📦 快速开始

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000)

### 构建项目
```bash
npm run build
```

### 启动生产环境
```bash
npm run start
```

## 📁 项目结构

```
ToolFlow/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/          # 国际化路由
│   │   │   ├── tools/[id]/    # 工具详情页
│   │   │   ├── layout.tsx     # 语言布局
│   │   │   ├── page.tsx       # 首页 (Server Component)
│   │   │   └── HomeClient.tsx # 首页客户端组件
│   │   ├── globals.css        # 全局样式
│   │   └── layout.tsx         # 根布局
│   ├── components/            # React 组件
│   │   ├── FilterBar.tsx      # 筛选栏
│   │   ├── Header.tsx         # 头部组件
│   │   ├── LanguageSwitch.tsx # 语言切换
│   │   ├── PricingBadge.tsx   # 价格标签
│   │   ├── ToolCard.tsx       # 工具卡片
│   │   └── ToolLogo.tsx       # 工具图标
│   ├── data/                  # 数据文件
│   │   ├── categories.json    # 中文分类数据
│   │   ├── categories-en.json # 英文分类数据
│   │   ├── tools.json         # 中文工具数据
│   │   └── tools-en.json      # 英文工具数据
│   ├── i18n/                  # 国际化配置
│   │   └── request.ts         # next-intl 配置
│   ├── lib/                   # 工具函数
│   │   ├── data.ts           # 数据操作
│   │   └── utils.ts          # 通用工具
│   ├── messages/              # 国际化消息
│   │   ├── zh.json           # 中文翻译
│   │   └── en.json           # 英文翻译
│   ├── types/                 # TypeScript 类型
│   │   └── index.ts
│   └── middleware.ts          # 国际化中间件
├── public/                    # 静态资源
├── next.config.js             # Next.js 配置 (含国际化)
├── tailwind.config.js         # Tailwind 配置
├── tsconfig.json             # TypeScript 配置
└── vercel.json               # Vercel 部署配置
```

## 🎨 设计系统

### 色彩方案
- **主色**: Blue (#3B82F6)
- **成功**: Green (#10B981)  
- **警告**: Orange (#F59E0B)
- **错误**: Red (#EF4444)

### 组件规范
- **圆角**: 8px (rounded-lg) / 12px (rounded-xl)
- **阴影**: 轻微阴影 (shadow-sm) / 悬停阴影 (shadow-md)
- **间距**: 4的倍数系统 (4px, 8px, 12px, 16px, 24px, 32px)

## 📊 数据结构

### 工具数据 (Tool)
```typescript
interface Tool {
  id: string                    // 唯一标识
  name: string                  // 工具名称
  description: string           // 详细描述
  url: string                   // 官网链接
  tags: string[]               // 标签数组
  category: string             // 所属分类
  addedAt: string              // 添加日期
  featured?: boolean           // 是否精选
  pricing?: 'Free' | 'Freemium' | 'Paid'  // 价格类型
  rating?: number              // 评分 (1-5)
}
```

### 分类数据 (Category)
```typescript
interface Category {
  id: string                   // 分类ID
  name: string                 // 分类名称
  description: string          // 分类描述
  color?: string              // 主题色
}
```

## 🚀 部署说明

### Vercel 部署 (推荐)
1. Fork 本项目到你的 GitHub
2. 在 [Vercel](https://vercel.com) 中导入项目
3. 配置环境变量（如需要）
4. 自动部署完成

### 手动部署
```bash
# 构建项目
npm run build

# 部署 .next 目录到你的服务器
```

## 🔧 自定义配置

### 🌐 国际化配置

项目使用 next-intl 实现多语言支持：

- **支持语言**: 中文 (zh)、英文 (en)
- **默认语言**: 中文
- **路由模式**: `/zh/` 和 `/en/` 前缀
- **自动检测**: 基于 Accept-Language 头

#### 添加新语言

1. 在 `src/messages/` 目录下添加新的语言文件（如 `fr.json`）
2. 在 `src/middleware.ts` 中添加语言代码到 `locales` 数组
3. 在 `src/i18n/request.ts` 中添加对应的语言验证
4. 创建对应的数据文件（如 `tools-fr.json`、`categories-fr.json`）

### 📊 添加新工具

分别编辑中英文工具数据文件：

**中文**: `src/data/tools.json`
**英文**: `src/data/tools-en.json`

```json
{
  "id": "new-tool",
  "name": "新工具名称",
  "description": "工具描述...",
  "url": "https://example.com",
  "tags": ["标签1", "标签2"],
  "category": "ai-assistant",
  "addedAt": "2024-01-20",
  "featured": true,
  "pricing": "Free",
  "rating": 4.5
}
```

### 📂 添加新分类

分别编辑中英文分类数据文件：

**中文**: `src/data/categories.json`
**英文**: `src/data/categories-en.json`

## 🤝 贡献指南

欢迎提交 Pull Request！

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 开源协议

本项目采用 MIT 协议开源 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙋‍♂️ 联系我们

- 项目链接: [https://github.com/your-username/toolflow](https://github.com/your-username/toolflow)
- 问题反馈: [Issues](https://github.com/your-username/toolflow/issues)

---

⭐ 如果这个项目对你有帮助，请给一个 Star！
