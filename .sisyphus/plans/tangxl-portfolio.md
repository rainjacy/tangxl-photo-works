# 唐西林摄影作品集网站 (回影无声) - 工作计划

## TL;DR

> **快速Summary**: 为摄影艺术家唐西林老师建立个人作品集网站《回影无声》，展示其记录的松江历史变迁
> 
> **交付成果**: 
> - 完整的 Nuxt 3 摄影作品集网站
> - 时间轴 + 地图交互双维度浏览
> - WebGL 首页动画
> - 中英双语支持
> 
> **预计工作量**: Medium
> **并行执行**: YES - 3 waves
> **关键路径**: 项目初始化 → 核心布局 → 内容填充 → 部署上线

---

## Context

### 原始需求
为唐西林老师建立个人摄影作品集网站，名为《回影无声》，记录松江从农业文明向工业文明转型的历史进程。

### 访谈总结

**关键讨论**:
1. **技术栈**: Nuxt 3 + Tailwind CSS + GSAP + Lenis + Vercel
2. **功能范围**: 完整展示（作品展示 + 时间轴 + 地图交互 + WebGL首页 + 灯箱 + 中英双语）
3. **内容规模**: 100张以下照片，双重分类（年代 + 地点）
4. **视觉风格**: 黑白影调，宣纸色背景，书法/印章元素
5. **托管**: Vercel

**研究结果**:
- Nuxt 3 + NuxtImg 最佳图片优化组合
- CSS Grid 可实现瀑布流布局
- GSAP + Lenis 实现丝滑转场效果
- Vercel 部署简单，支持 SSR/SSG

---

## Work Objectives

### 核心目标
建立一个沉浸式的摄影作品集网站，让观众能够通过时间轴和地理坐标两个维度探索唐西林老师的作品，感受松江的历史变迁。

### 具体交付物

| 类型 | 内容 |
|------|------|
| 首页 | WebGL/Canvas 3D 效果，作品集入口 |
| 作品浏览 | Masonry 瀑布流布局，支持双重分类 |
| 时间轴 | 按年代（70年代/90年代/新世纪）浏览 |
| 地图 | 松江记忆地图交互 |
| 作品详情 | 沉浸式灯箱，高清查看 |
| 关于 | 艺术家简介、访谈、媒体报道 |
| 联系方式 | 版权咨询/收藏意向表单 |

### 完成定义
- [ ] 网站可在本地开发服务器运行
- [ ] 所有页面响应式适配（手机/iPad/桌面）
- [ ] 中英双语切换正常
- [ ] 图片懒加载和优化正常工作
- [ ] 可部署到 Vercel

### 必备功能
- [ ] 响应式设计
- [ ] 图片懒加载
- [ ] 灯箱查看
- [ ] 分类筛选
- [ ] 中英双语

### 禁止功能 (Guardrails)
- [ ] 复杂的电商功能
- [ ] 用户登录/注册系统
- [ ] 社交分享功能（保持简洁）
- [ ] 过度动画效果（影响加载性能）

---

## Verification Strategy

### 测试决策
- **Infrastructure exists**: NO (全新项目)
- **User wants tests**: NO (标准模式，快速交付)
- **Framework**: N/A (手动验证)
- **QA approach**: Manual verification (开发服务器测试)

### Manual Verification Approach

每个任务完成后，执行以下验证：

| 任务类型 | 验证方法 |
|----------|----------|
| 页面组件 | 浏览器访问 localhost:3000，检查渲染 |
| 路由 | 访问各路径，验证页面加载 |
| 图片 | 检查懒加载、灯箱功能 |
| 交互 | 测试筛选、切换、双语功能 |
| 部署 | Vercel 部署后线上验证 |

---

## Execution Strategy

### 并行执行 Waves

```
Wave 1 (立即开始):
├── Task 1: 初始化 Nuxt 3 项目
└── Task 2: 配置 Tailwind CSS + GSAP + Lenis

Wave 2 (Wave 1 完成后):
├── Task 3: 创建基础布局和导航
├── Task 4: 首页 WebGL 效果
├── Task 5: 作品列表页面 (Masonry)
└── Task 6: 图片灯箱组件

Wave 3 (Wave 2 完成后):
├── Task 7: 时间轴页面
├── Task 8: 地图交互页面
├── Task 9: 关于页面
├── Task 10: 联系方式页面
└── Task 11: 中英双语支持

Wave 4 (最终):
├── Task 12: Vercel 部署配置
└── Task 13: 最终测试与优化
```

### Agent Dispatch Summary

| Wave | Tasks | Recommended Agents |
|------|-------|-------------------|
| 1 | 1, 2 | quick |
| 2 | 3, 4, 5, 6 | visual-engineering |
| 3 | 7, 8, 9, 10, 11 | visual-engineering |
| 4 | 12, 13 | quick |

---

## TODOs

### Wave 1: 项目初始化

- [ ] 1. 初始化 Nuxt 3 项目并安装依赖

  **What to do**:
  - 运行 `npx nuxi@latest init tangxl-portfolio` 初始化项目
  - 安装核心依赖：nuxt, @nuxtjs/tailwindcss, @nuxt/image
  - 安装动画依赖：gsap, @studio-freight/lenis
  - 安装其他：@nuxtjs/i18n (中英双语)
  
  **Must NOT do**:
  - 不要安装不必要的 UI 组件库
  
  **Recommended Agent Profile**:
  - **Category**: quick
    - Reason: 基础项目设置，命令执行类任务
  - **Skills**: none
  
  **Parallelization**:
  - **Can Run In Parallel**: YES (Wave 1)
  - **Blocks**: Tasks 3-13
  - **Blocked By**: None

  **Acceptance Criteria**:
  - [ ] `npm run dev` 启动成功
  - [ ] http://localhost:3000 可访问
  - [ ] package.json 包含所有依赖

  **Commit**: YES
  - Message: `chore: initialize nuxt3 project`
  - Files: `package.json`, `nuxt.config.ts`

- [ ] 2. 配置 Tailwind CSS + GSAP + Lenis

  **What to do**:
  - 配置 nuxt.config.ts 添加 Tailwind 模块
  - 创建 tailwind.config.js 配置主题色（宣纸色、墨色）
  - 在 plugins 目录创建 gsap 插件
  - 配置 Lenis 平滑滚动
  - 设置全局 CSS 变量
  
  **Must NOT do**:
  - 不要修改 Nuxt 默认配置以外的内容
  
  **Recommended Agent Profile**:
  - **Category**: quick
    - Reason: 配置类任务
  - **Skills**: none
  
  **Parallelization**:
  - **Can Run In Parallel**: YES (Wave 1)
  - **Blocks**: Tasks 3-13
  - **Blocked By**: Task 1

  **Acceptance Criteria**:
  - [ ] Tailwind 样式生效
  - [ ] GSAP 可在组件中使用
  - [ ] Lenis 平滑滚动生效
  - [ ] 主题色正确应用

  **Commit**: YES
  - Message: `chore: configure tailwind, gsap, lenis`

---

### Wave 2: 核心页面开发

- [ ] 3. 创建基础布局和导航组件

  **What to do**:
  - 创建 layouts/default.vue 主布局
  - 创建 components/AppHeader.vue 导航栏
  - 创建 components/AppFooter.vue 页脚
  - 实现响应式导航（手机 hamburger 菜单）
  - 添加中英双语切换按钮
  - 融入书法/印章设计元素
  
  **Must NOT do**:
  - 不要创建固定宽度的布局
  
  **Recommended Agent Profile**:
  - **Category**: visual-engineering
    - Reason: UI/UX 设计相关，需要艺术感
  - **Skills**: frontend-ui-ux
  
  **Parallelization**:
  - **Can Run In Parallel**: YES (Wave 2)
  - **Blocks**: Tasks 4-13
  - **Blocked By**: Task 1, 2

  **Acceptance Criteria**:
  - [ ] 导航栏响应式适配
  - [ ] 双语切换正常
  - [ ] 书法/印章元素显示正确
  - [ ] 所有页面共享布局

  **Commit**: YES
  - Message: `feat: add base layout and navigation`

- [ ] 4. 首页 WebGL 3D 效果

  **What to do**:
  - 创建 pages/index.vue 首页
  - 实现 Canvas/WebGL 3D 效果：照片如记忆碎片漂浮
  - 添加"进入作品集"入口按钮
  - 展示网站标题《回影无声》
  - 融入书法签名元素
  - 移动端降级为静态背景图
  
  **Must NOT do**:
  - 不要使用过重的 WebGL 效果影响性能
  - 移动端不强制 WebGL
  
  **Recommended Agent Profile**:
  - **Category**: visual-engineering
    - Reason: 创意动画效果，需要艺术感
  - **Skills**: frontend-ui-ux
  
  **Parallelization**:
  - **Can Run In Parallel**: YES (Wave 2)
  - **Blocks**: None (独立页面)
  - **Blocked By**: Task 1, 2, 3

  **Acceptance Criteria**:
  - [ ] WebGL 效果在桌面端流畅运行
  - [ ] 移动端正常降级
  - [ ] 标题和签名显示正确
  - [ ] 入口按钮可点击

  **Commit**: YES
  - Message: `feat: add WebGL hero section`

- [ ] 5. 作品列表页面 (Masonry 瀑布流)

  **What to do**:
  - 创建 pages/gallery/index.vue 作品列表页
  - 实现 CSS Grid Masonry 瀑布流布局
  - 集成 NuxtImg 进行图片优化（懒加载、WebP）
  - 实现分类筛选（年代/地点）
  - 添加筛选状态管理
  - 响应式列数（手机1列/iPad 2列/桌面3-4列）
  
  **Must NOT do**:
  - 不要一次性加载所有图片
  
  **Recommended Agent Profile**:
  - **Category**: visual-engineering
    - Reason: 核心作品展示，需要精心设计
  - **Skills**: frontend-ui-ux
  
  **Parallelization**:
  - **Can Run In Parallel**: YES (Wave 2)
  - **Blocks**: None
  - **Blocked By**: Task 1, 2, 3

  **Acceptance Criteria**:
  - [ ] 瀑布流布局正确显示
  - [ ] 图片懒加载生效
  - [ ] 分类筛选功能正常
  - [ ] 响应式适配正确

  **Commit**: YES
  - Message: `feat: add gallery masonry layout`

- [ ] 6. 图片灯箱组件

  **What to do**:
  - 创建 components/PhotoLightbox.vue 灯箱组件
  - 实现全屏查看功能
  - 支持键盘导航（左右箭头、ESC 关闭）
  - 支持触摸滑动（移动端）
  - 添加图片信息（标题、年份、地点）
  - 可选的右键保护提示
  
  **Must NOT do**:
  - 不要禁用所有右键功能（影响体验）
  
  **Recommended Agent Profile**:
  - **Category**: visual-engineering
    - Reason: 交互组件，需要流畅体验
  - **Skills**: frontend-ui-ux
  
  **Parallelization**:
  - **Can Run In Parallel**: YES (Wave 2)
  - **Blocks**: Task 5 (依赖)
  - **Blocked By**: Task 1, 2, 3

  **Acceptance Criteria**:
  - [ ] 点击图片打开灯箱
  - [ ] 键盘导航正常
  - [ ] 触摸滑动正常
  - [ ] ESC 关闭正常

  **Commit**: YES
  - Message: `feat: add photo lightbox component`

---

### Wave 3: 内容页面

- [ ] 7. 时间轴页面

  **What to do**:
  - 创建 pages/timeline.vue 时间轴页
  - 设计垂直时间轴布局
  - 按年代分组（70年代/90年代/新世纪）
  - 每个年代下展示代表性作品
  - 点击跳转对应作品
  - 动画入场效果
  
  **Must NOT do**:
  - 不要展示所有照片（选择代表性）
  
  **Recommended Agent Profile**:
  - **Category**: visual-engineering
    - Reason: 内容展示页面
  - **Skills**: frontend-ui-ux
  
  **Parallelization**:
  - **Can Run In Parallel**: YES (Wave 3)
  - **Blocks**: None
  - **Blocked By**: Wave 2 完成

  **Acceptance Criteria**:
  - [ ] 时间轴布局正确
  - [ ] 年代分组清晰
  - [ ] 点击跳转正常

  **Commit**: YES
  - Message: `feat: add timeline page`

- [ ] 8. 地图交互页面

  **What to do**:
  - 创建 pages/map.vue 地图页
  - 设计松江区域简化地图（可用 SVG 或静态图）
  - 标记关键地点（醉白池、中山路、老城区等）
  - 点击地点显示该地点的作品
  - 地点对比功能（过去vs现在）
  
  **Must NOT do**:
  - 不要使用付费地图 API
  
  **Recommended Agent Profile**:
  - **Category**: visual-engineering
    - Reason: 交互地图，需要创意设计
  - **Skills**: frontend-ui-ux
  
  **Parallelization**:
  - **Can Run In Parallel**: YES (Wave 3)
  - **Blocks**: None
  - **Blocked By**: Wave 2 完成

  **Acceptance Criteria**:
  - [ ] 地图显示正确
  - [ ] 地点标记可点击
  - [ ] 显示对应作品

  **Commit**: YES
  - Message: `feat: add map interaction page`

- [ ] 9. 关于页面

  **What to do**:
  - 创建 pages/about.vue 关于页
  - 艺术家简介（唐西林老师的经历）
  - 作品风格说明
  - 媒体报道链接（澎湃新闻等）
  - 访谈视频嵌入（如果有）
  - 展览经历
  
  **Must NOT do**:
  - 不要添加过长的文字
  
  **Recommended Agent Profile**:
  - **Category**: visual-engineering
    - Reason: 内容展示页面
  - **Skills**: frontend-ui-ux
  
  **Parallelization**:
  - **Can Run In Parallel**: YES (Wave 3)
  - **Blocks**: None
  - **Blocked By**: Wave 2 完成

  **Acceptance Criteria**:
  - [ ] 页面布局美观
  - [ ] 媒体链接可点击
  - [ ] 视频嵌入正常

  **Commit**: YES
  - Message: `feat: add about page`

- [ ] 10. 联系方式页面

  **What to do**:
  - 创建 pages/contact.vue 联系页
  - 版权咨询/收藏意向表单
  - 表单字段：姓名、邮箱、意向描述
  - 表单验证
  - 提交成功提示
  - 其他联系方式（邮箱、电话）
  
  **Must NOT do**:
  - 不要接入复杂的邮件服务
  
  **Recommended Agent Profile**:
  - **Category**: visual-engineering
    - Reason: 表单页面
  - **Skills**: frontend-ui-ux
  
  **Parallelization**:
  - **Can Run In Parallel**: YES (Wave 3)
  - **Blocks**: None
  - **Blocked By**: Wave 2 完成

  **Acceptance Criteria**:
  - [ ] 表单提交成功
  - [ ] 验证正常工作
  - [ ] 响应式适配

  **Commit**: YES
  - Message: `feat: add contact page`

- [ ] 11. 中英双语支持

  **What to do**:
  - 配置 @nuxtjs/i18n 模块
  - 创建 locales/en.json 和 locales/zh.json
  - 翻译所有页面文案
  - 路由前缀支持 (/en, /zh)
  - 语言切换器组件
  
  **Must NOT do**:
  - 不要遗漏任何文案
  
  **Recommended Agent Profile**:
  - **Category**: quick
    - Reason: 配置和文案任务
  - **Skills**: none
  
  **Parallelization**:
  - **Can Run In Parallel**: YES (Wave 3)
  - **Blocks**: All pages (需要双语)
  - **Blocked By**: Wave 2 完成

  **Acceptance Criteria**:
  - [ ] 语言切换正常
  - [ ] 所有页面双语完整
  - [ ] URL 路由正确

  **Commit**: YES
  - Message: `feat: add i18n bilingual support`

---

### Wave 4: 部署与优化

- [ ] 12. Vercel 部署配置

  **What to do**:
  - 创建 vercel.json 配置文件
  - 配置 SSR/SSG 输出
  - 配置图片域名
  - 创建部署脚本
  - 本地构建测试
  
  **Must NOT do**:
  - 不要提交敏感配置
  
  **Recommended Agent Profile**:
  - **Category**: quick
    - Reason: 部署配置
  - **Skills**: none
  
  **Parallelization**:
  - **Can Run In Parallel**: NO (Wave 4 - 最终)
  - **Blocks**: None
  - **Blocked By**: Wave 3 完成

  **Acceptance Criteria**:
  - [ ] `npm run build` 成功
  - [ ] 本地 preview 正常
  - [ ] Vercel 配置正确

  **Commit**: YES
  - Message: `chore: add vercel deployment config`

- [ ] 13. 最终测试与优化

  **What to do**:
  - 全页面功能测试
  - 响应式测试（手机/iPad/桌面）
  - 图片加载性能检查
  - SEO meta 标签检查
  - 修复发现的问题
  - 性能优化（如需要）
  
  **Must NOT do**:
  - 不要做大幅度修改
  
  **Recommended Agent Profile**:
  - **Category**: quick
    - Reason: 测试任务
  - **Skills**: none
  
  **Parallelization**:
  - **Can Run In Parallel**: NO (Wave 4 - 最终)
  - **Blocks**: None
  - **Blocked By**: Task 12

  **Acceptance Criteria**:
  - [ ] 所有页面可访问
  - [ ] 响应式正常
  - [ ] 功能完整

  **Commit**: YES (if fixes)
  - Message: `fix: final fixes and optimizations`

---

## Commit Strategy

| After Task | Message | Files | Verification |
|------------|---------|-------|--------------|
| 1 | `chore: initialize nuxt3 project` | package.json, nuxt.config.ts | npm run dev |
| 2 | `chore: configure tailwind, gsap, lenis` | tailwind.config.js, plugins/ | npm run dev |
| 3 | `feat: add base layout and navigation` | layouts/, components/ | localhost:3000 |
| 4 | `feat: add WebGL hero section` | pages/index.vue | localhost:3000 |
| 5 | `feat: add gallery masonry layout` | pages/gallery/ | localhost:3000/gallery |
| 6 | `feat: add photo lightbox component` | components/PhotoLightbox.vue | 点击图片测试 |
| 7 | `feat: add timeline page` | pages/timeline.vue | localhost:3000/timeline |
| 8 | `feat: add map interaction page` | pages/map.vue | localhost:3000/map |
| 9 | `feat: add about page` | pages/about.vue | localhost:3000/about |
| 10 | `feat: add contact page` | pages/contact.vue | localhost:3000/contact |
| 11 | `feat: add i18n bilingual support` | locales/, nuxt.config.ts | 语言切换测试 |
| 12 | `chore: add vercel deployment config` | vercel.json | npm run build |
| 13 | `fix: final fixes` | (根据需要) | npm run preview |

---

## Success Criteria

### 验证命令
```bash
# 开发环境
npm run dev
# 访问 http://localhost:3000

# 构建测试
npm run build
npm run preview
# 访问 http://localhost:3000

# Vercel 部署
vercel deploy --prod
```

### 最终检查清单
- [ ] 所有必备功能存在
- [ ] 所有禁止功能不存在
- [ ] 响应式适配正常
- [ ] 图片优化生效
- [ ] 中英双语完整
- [ ] Vercel 部署成功
- [ ] 网站可正常访问

---

## 补充说明

### 素材组织结构
建议按以下结构组织照片素材：
```
public/
  photos/
    1970s/        # 70年代作品
    1990s/        # 90年代作品
    new-century/  # 新世纪作品
    locations/    # 按地点分类（可选）
```

### 数据配置
建议使用 JSON 文件管理作品元数据：
```json
// content/photos.json
[
  {
    "id": "001",
    "title": "古城余韵",
    "year": "1978",
    "location": "醉白池",
    "category": "1970s",
    "filename": "001.jpg",
    "description": "描述文字..."
  }
]
```

### SEO 考虑
- 每个页面添加 meta title/description
- 使用 Nuxt 的 useHead composable
- 图片添加 alt 文本
- 生成 sitemap（可选）
