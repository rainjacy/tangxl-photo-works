# 项目知识库

**生成时间：** 2026-03-06
**项目：** tangxl-portfolio

## 概述

Nuxt.js 4 摄影师唐西林（唐西林）摄影作品集，记录松江从农业文明向工业文明转型的历史进程。

## 目录结构

```
tangxl-portfolio/
├── nuxt.config.ts       # Nuxt 配置
├── tailwind.config.js  # Tailwind 主题（自定义颜色）
├── app.vue             # 根组件（Lenis 平滑滚动）
├── pages/              # 路由页面（6个）
│   ├── index.vue       # 首页
│   ├── about.vue       # 关于
│   ├── timeline.vue    # 时间线
│   ├── map.vue         # 地图视图
│   ├── gallery/        # 画廊路由
│   │   └── index.vue
│   └── contact.vue     # 联系方式
├── components/         # Vue 组件（3个）
│   ├── AppHeader.vue
│   ├── AppFooter.vue
│   └── PhotoLightbox.vue
├── layouts/            # 布局（1个）
│   └── default.vue
├── assets/css/         # 全局样式
│   └── main.css        # CSS 变量、动画
└── locales/            # i18n 翻译
    ├── zh.json
    └── en.json
```

## 查找位置

| 任务 | 位置 | 备注 |
|------|------|------|
| 添加新页面 | `pages/` | Nuxt 自动路由 |
| 添加组件 | `components/` | 自动导入 |
| 更新样式 | `assets/css/main.css` | CSS 变量定义在此 |
| 添加翻译 | `locales/` | zh.json / en.json |
| 配置 | `nuxt.config.ts` | 模块、i18n、图片配置 |

## 代码地图

| 符号 | 类型 | 位置 | 作用 |
|------|------|------|------|
| Lenis | 库 | app.vue | 平滑滚动初始化 |
| NuxtPage | 组件 | app.vue | 路由渲染 |
| NuxtLayout | 组件 | app.vue | 布局包装器 |

## 约定

- **组件**：PascalCase，自动导入
- **页面**：基于文件的 Nuxt 路由
- **样式**：Tailwind + CSS 变量（定义在 main.css）
- **i18n**：使用 `useLocale()` 获取翻译
- **图片**：使用 `<NuxtImg>` 优化图片

## 反模式

- 不要在 `components/` 子目录中添加组件（Nuxt 自动平铺导入）
- 不要使用 `<script>`，应使用 `<script setup lang="ts">`

## 独特风格

**自定义 Tailwind 颜色：**
- `primary`: #2d2d2d
- `ink-black`: #1a1a1a
- `rice-paper`: #faf6ed（背景色）
- `seal-red`: #8b0000

**字体：**
- serif: Noto Serif SC
- sans: Noto Sans SC

## 命令

```bash
npm run dev      # 启动开发服务器
npm run build    # 生产环境构建
npm run generate # 静态生成
npm run preview  # 预览生产构建
```

## 备注

- 网站标题："回影无声 - 唐西林摄影作品集"
- Lenis 平滑滚动在 app.vue 的 onMounted 中初始化
- 图片优化通过 @nuxt/image（webp，质量 80）
- i18n：zh（默认）/ en，使用 prefix_except_default 策略
