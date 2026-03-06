# Strapi CMS 集成计划 - tangxl-portfolio

## TL;DR

> **快速摘要**: 将 Strapi Cloud 作为无头 CMS 集成到现有的 Nuxt.js 摄影作品集网站中，使非技术用户（唐老师）可以通过管理面板管理内容。现有硬编码数据将通过 SSR 集成迁移到 Strapi。

> **交付成果**:
> - Strapi Cloud 项目，包含内容类型（作品、时间线、关于、联系方式）
> - 从 Vue 文件迁移现有数据到 Strapi
> - 修改 Nuxt 前端，通过 SSR 从 Strapi API 获取数据
> - API 集成的自动化测试套件
> - 唐老师使用的管理面板操作文档
>
> **预计工作量**: 中等
> **并行执行**: 是 - 2 个阶段
> **关键路径**: Strapi 设置 → 数据迁移 → 前端集成 → 测试

---

## 背景

### 原始需求
用户希望为其现有的 Nuxt.js 摄影作品集网站（tangxl-portfolio）添加 Strapi（无头 CMS）。目标是：
1. 为非技术用户（唐老师）提供友好的管理面板来管理内容
2. 迁移 Vue 文件中现有的硬编码数据
3. 使用 Strapi Cloud 进行托管（托管服务）
4. 与动态 SSR 渲染集成

### 访谈总结
**关键讨论**:
- **现有数据**: 需要从硬编码的 Vue 文件迁移
- **内容类型**: 作品、时间线、关于、联系方式
- **媒体存储**: Strapi 默认（内置）
- **渲染方式**: 动态 SSR（非 SSG）
- **测试**: 需要添加自动化测试
- **管理员用户**: 唐老师（非技术人员）需要管理员访问权限

**研究结果**:
- Strapi v5 是最新版本，开发者体验更好
- Nuxt 有 @nuxt/strapi 模块便于集成
- SSR 方式：使用 useNuxtApp() + useStrapiFind() 组合式函数
- Strapi Cloud 提供托管服务，支持自动扩展

### Metis 审查
**已识别的差距**（已解决）:
- **差距 1**: 环境变量和 API 令牌安全 → 将使用 Strapi API 令牌并配置正确的 CORS
- **差距 2**: 唐老师的管理员用户角色 → 将设置 Editor 角色（非 Admin）
- **差距 3**: 图片迁移策略 → 将图片上传到 Strapi 媒体库
- **差距 4**: 前端缓存性能 → 将使用 useFetch 并配置正确的缓存头

---

## 工作目标

### 核心目标
将 Strapi Cloud 作为无头 CMS 集成到 tangxl-portfolio 中，用动态 API 调用替换硬编码的 Vue 数据，同时保持现有的 UI/UX。

### 具体交付物
- 配置好内容类型的 Strapi Cloud 项目
- 迁移 ~9+ 张照片及元数据
- 迁移时间线事件（3 个时代）
- 迁移关于页面内容（简介、展览、媒体报道）
- 迁移联系方式
- 修改 Nuxt 页面从 Strapi API 获取数据
- 自动化测试套件
- 唐老师使用的用户指南文档

### 完成定义
- [ ] Strapi Cloud 项目创建并可访问
- [ ] 在 Strapi 管理面板中创建所有内容类型
- [ ] 所有现有数据迁移到 Strapi
- [ ] 前端页面从 Strapi API 显示数据
- [ ] 管理面板可供唐老师访问
- [ ] 自动化测试通过
- [ ] UI/UX 无退化

### 必备功能
- 非技术用户（唐老师）可以通过管理面板管理所有内容
- Strapi 中的更改立即反映在前端（SSR）
- 保留所有现有照片和内容
- 保持原有的移动端响应式

### 禁止功能（防护栏）
- 不要修改现有 UI/UX 布局（数据源除外）
- 不要更改 Strapi 默认的图片托管
- 不要在客户端代码中暴露 API 令牌
- 不要创建自定义插件 - 使用官方 @nuxt/strapi

---

## 验证策略（必填）

### 测试决策
- **基础设施存在**: 否
- **用户需要测试**: 是
- **测试框架**: Vitest（快速、现代，与 Nuxt 配合良好）

### 测试设置任务
- [ ] 0. 设置测试基础设施
  - 安装: `npm install -D vitest @nuxt/test-utils @vue/test-utils jsdom`
  - 配置: 在 tangxl-portfolio 中创建 `vitest.config.ts`
  - 验证: `npx vitest --version` → 显示版本
  - 示例: 创建 `tests/example.test.ts`
  - 验证: `npx vitest run` → 1 个测试通过

### 测试覆盖范围
- API 响应结构验证
- 使用模拟数据的组件渲染
- API 失败的错误处理

---

## 执行策略

### 并行执行阶段

```
第一阶段（立即开始）:
├── 任务 1: 创建 Strapi Cloud 项目
├── 任务 2: 在 Strapi 中创建内容类型
└── 任务 3: 设置 Nuxt 测试基础设施

第二阶段（第一阶段完成后）:
├── 任务 4: 迁移作品数据
├── 任务 5: 迁移时间线数据
├── 任务 6: 迁移关于页面数据
├── 任务 7: 迁移联系方式数据
├── 任务 8: 将作品页面与 Strapi 集成
├── 任务 9: 将时间线页面与 Strapi 集成
├── 任务 10: 将关于页面与 Strapi 集成
├── 任务 11: 将联系方式页面与 Strapi 集成
└── 任务 12: 编写自动化测试

关键路径: 任务 1 → 任务 2 → 任务 4 → 任务 8
并行加速: 比顺序执行快约 30%
```

### 依赖矩阵

| 任务 | 依赖 | 阻塞 | 可并行 |
|------|------|------|--------|
| 1 | 无 | 2 | 3 |
| 2 | 1 | 4,5,6,7 | 无 |
| 3 | 无 | 12 | 1,2 |
| 4 | 2 | 8 | 5,6,7 |
| 5 | 2 | 9 | 4,6,7 |
| 6 | 2 | 10 | 4,5,7 |
| 7 | 2 | 11 | 4,5,6 |
| 8 | 4 | 无 | 9,10,11 |
| 9 | 5 | 无 | 8,10,11 |
| 10 | 6 | 无 | 8,9,11 |
| 11 | 7 | 无 | 8,9,10 |
| 12 | 3,8,9,10,11 | 无 | 无（最终） |

### 代理调度摘要

| 阶段 | 任务 | 推荐代理 |
|------|------|----------|
| 1 | 1, 2, 3 | general（设置+配置） |
| 2 | 4,5,6,7,8,9,10,11,12 | general（数据迁移+集成） |

---

## 任务清单

- [ ] 1. 创建 Strapi Cloud 项目

  **要做的事**:
  - 在 strapi.cloud 创建 Strapi Cloud 账号
  - 创建新项目: "tangxl-portfolio-cms"
  - 注意: Strapi 为小项目提供免费套餐
  - 配置项目设置（名称、区域）
  - 如需要可邀请团队成员

  **禁止做的事**:
  - 不要使用自托管 Strapi（用户要求使用 Cloud）

  **推荐的代理配置**:
  - **分类**: `unspecified-high`
    - 理由: 这是云服务设置任务，非编码任务
  - **技能**: 云设置无需技能

  **并行化**:
  - **可并行运行**: 是
  - **并行组**: 第一阶段（与任务 2、3）
  - **阻塞**: 任务 2（需要项目 URL）
  - **被阻塞**: 无（可立即开始）

  **验收标准**:
  - [ ] 在 https://cloud.strapi.io 创建 Strapi Cloud 项目
  - [ ] 管理面板可在项目 URL 访问
  - [ ] 可使用凭据登录
  - [ ] 项目显示"空"状态（暂无内容）

  **提交**: 否

---

- [ ] 2. 在 Strapi 中创建内容类型

  **要做的事**:
  - 创建 "Photo" 集合类型，字段包括:
    - title（文本，短文本）
    - year（文本，短文本或数字）
    - location（文本，短文本）
    - src（媒体，单张图片）
    - width（数字，整数）
    - height（数字，整数）
    - category（枚举: "1970s", "1990s", "newCentury"）
  - 创建 "TimelineEvent" 集合类型:
    - period（文本，短文本）
    - title（文本，短文本）
    - description（富文本或长文本）
    - photos（媒体，多个）
  - 创建 "About" 单例类型:
    - artistName（文本，短文本）
    - biography（富文本）
    - exhibitions（组件，可重复: year, title, venue）
    - mediaCoverage（组件，可重复: title, url）
  - 创建 "Contact" 单例类型:
    - email（文本，短文本）
    - phone（文本，短文本）
  - 设置角色: 为唐老师创建 "Editor" 角色（完全访问内容，无设置权限）

  **禁止做的事**:
  - 不要创建自定义字段类型
  - 不要过多修改默认角色

  **推荐的代理配置**:
  - **分类**: `unspecified-high`
    - 理由: 通过 Strapi 管理面板 UI 进行配置任务

  **并行化**:
  - **可并行运行**: 否
  - **并行组**: 第一阶段
  - **阻塞**: 任务 4,5,6,7（需要内容类型存在）
  - **被阻塞**: 任务 1（需要项目 URL）

  **参考**:
  - Strapi 内容类型构建器文档: https://docs.strapi.io/user-docs/content-type-builder
  - 当前数据结构位于: `pages/gallery/index.vue`, `pages/timeline.vue`, `pages/about.vue`, `pages/contact.vue`

  **验收标准**:
  - [ ] 创建包含所有字段的 Photo 集合类型
  - [ ] 创建 TimelineEvent 集合类型
  - [ ] 创建 About 单例类型
  - [ ] 创建 Contact 单例类型
  - [ ] 创建具有适当权限的 Editor 角色
  - [ ] 发布内容类型（启用）

  **提交**: 否

---

- [ ] 3. 设置 Nuxt 测试基础设施

  **要做的事**:
  - 安装测试依赖: `npm install -D vitest @nuxt/test-utils @vue/test-utils jsdom`
  - 创建 `vitest.config.ts`:
    ```typescript
    import { defineConfig } from 'vitest/config'
    import vue from '@vitejs/plugin-vue'
    
    export default defineConfig({
      plugins: [vue()],
      test: {
        environment: 'jsdom',
        include: ['tests/**/*.test.ts']
      }
    })
    ```
  - 在 `package.json` 中添加测试脚本: `"test": "vitest run", "test:watch": "vitest"`
  - 创建示例测试: `tests/example.test.ts`
  - 验证: `npm test` → 通过

  **禁止做的事**:
  - 不要修改现有源代码

  **推荐的代理配置**:
  - **分类**: `quick`
    - 理由: 简单的设置任务

  **并行化**:
  - **可并行运行**: 是
  - **并行组**: 第一阶段（与任务 1、2）
  - **阻塞**: 任务 12（需要测试基础设施）
  - **被阻塞**: 无

  **参考**:
  - Vitest 文档: https://vitest.dev/
  - @nuxt/test-utils: https://test-utils.nuxtjs.org/

  **验收标准**:
  - [ ] 在 tangxl-portfolio/ 中创建 vitest.config.ts
  - [ ] package.json 中包含测试依赖
  - [ ] "test" 脚本可用: `npm test` 成功运行
  - [ ] 示例测试通过

  **提交**: 是
  - 消息: `test: add vitest infrastructure`
  - 文件: `vitest.config.ts`, `package.json`, `tests/example.test.ts`
  - 提交前: `npm test`

---

- [ ] 4. 迁移作品数据

  **要做的事**:
  - 访问 Strapi 管理面板 → 内容管理器 → Photo
  - 创建与 `pages/gallery/index.vue` 中现有数据匹配的条目:
    1. 古城余韵, 1978, 醉白池, 1970s
    2. 老街清晨, 1985, 中山路, 1970s
    3. 工业变迁, 1992, 松江工业区, 1990s
    4. 老宅门楼, 1988, 仓城, 1970s
    5. 新城崛起, 2005, 松江新城, newCentury
    6. 渡口记忆, 1995, 黄浦江渡口, 1990s
    7. 老城改造, 2010, 老城区, newCentury
    8. 古桥流水, 1982, 大仓桥, 1970s
    9. 现代社区, 2018, 松江, newCentury
  - 图片: 上传到 Strapi 媒体库，然后附加到条目
  - 注意: 目前可使用占位符图片或上传本地实际照片

  **禁止做的事**:
  - 不要跳过任何现有条目

  **推荐的代理配置**:
  - **分类**: `unspecified-high`
    - 理由: 通过管理面板手动输入数据

  **并行化**:
  - **可并行运行**: 是
  - **并行组**: 第二阶段（与任务 5、6、7）
  - **阻塞**: 任务 8（需要数据存在）
  - **被阻塞**: 任务 2（需要内容类型）

  **参考**:
  - 现有数据位于: `pages/gallery/index.vue:84-94`

  **验收标准**:
  - [ ] 在 Strapi 中创建所有 9 个作品条目
  - [ ] 每个条目包含: title, year, location, category
  - [ ] 所有条目已发布（非草稿）
  - [ ] API 返回数据: GET /api/photos

  **提交**: 否（数据在 Strapi Cloud，非代码）

---

- [ ] 5. 迁移时间线数据

  **要做的事**:
  - 访问 Strapi 管理面板 → 内容管理器 → TimelineEvent
  - 创建与 `pages/timeline.vue` 中现有时间线匹配的条目:
    1. period: "1970s", title: "农业文明的尾声", description: "记录松江最后的农业风光..."
       - photos: [古城余韵, 老街清晨, 古桥流水, 渡口记忆]
    2. period: "1990s", title: "工业化的浪潮", description: "城市扩张，工业区崛起..."
       - photos: [工业变迁, 老城改造, 新城崛起, 建设中...]
    3. period: "2000s", title: "新世纪的模样", description: "现代化的新城，社区的发展与变迁"
       - photos: [现代社区, 城市新貌, 公园绿地, 夜幕松江]
  - 将媒体库中的现有照片链接到时间线事件

  **禁止做的事**:
  - 不要创建重复照片 - 复用任务 4 的照片

  **推荐的代理配置**:
  - **分类**: `unspecified-high`
    - 理由: 通过管理面板手动输入数据

  **并行化**:
  - **可并行运行**: 是
  - **并行组**: 第二阶段（与任务 4、6、7）
  - **阻塞**: 任务 9（需要数据）
  - **被阻塞**: 任务 2

  **参考**:
  - 现有数据位于: `pages/timeline.vue:53-87`

  **验收标准**:
  - [ ] 创建 3 个时间线事件
  - [ ] 每个包含: period, title, description, photos
  - [ ] 全部已发布

  **提交**: 否

---

- [ ] 6. 迁移关于页面数据

  **要做的事**:
  - 访问 Strapi 管理面板 → 内容管理器 → About（单例类型）
  - 创建条目:
    - artistName: "唐西林"
    - biography: [来自 about.vue 的 3 段文字]
    - exhibitions 组件:
      - 2019, 「回影无声」个人作品展，上海美术馆
      - 2015, 「松江记忆」群展，松江美术馆
      - 2010, 「城市影像」邀请展，北京
    - mediaCoverage 组件:
      - 澎湃新闻 - 「回影无声」...
      - 解放日报 - 用镜头记录城市变迁
      - 新民周刊 - 唐西林：最后的松江

  **禁止做的事**:
  - 不要遗漏任何展览或媒体条目

  **推荐的代理配置**:
  - **分类**: `unspecified-high`
    - 理由: 手动数据输入

  **并行化**:
  - **可并行运行**: 是
  - **并行组**: 第二阶段（与任务 4、5、7）
  - **阻塞**: 任务 10
  - **被阻塞**: 任务 2

  **参考**:
  - 现有数据位于: `pages/about.vue:19-70`

  **验收标准**:
  - [ ] 创建包含所有字段的 About 单例类型
  - [ ] 艺术家姓名和简介完整
  - [ ] 添加所有 3 个展览
  - [ ] 添加所有 3 个媒体条目
  - [ ] 已发布

  **提交**: 否

---

- [ ] 7. 迁移联系方式数据

  **要做的事**:
  - 访问 Strapi 管理面板 → 内容管理器 → Contact（单例类型）
  - 创建条目:
    - email: "contact@example.com"
    - phone: "138-0000-0000"
  - 注意: 这些是占位符值 - 用户可稍后更新

  **禁止做的事**:
  - 不要添加表单提交逻辑（超出范围）

  **推荐的代理配置**:
  - **分类**: `quick`
    - 理由: 简单的单个条目

  **并行化**:
  - **可并行运行**: 是
  - **并行组**: 第二阶段（与任务 4、5、6）
  - **阻塞**: 任务 11
  - **被阻塞**: 任务 2

  **参考**:
  - 现有数据位于: `pages/contact.vue:75-82`

  **验收标准**:
  - [ ] 创建 Contact 单例类型
  - [ ] 填写 email 和 phone 字段
  - [ ] 已发布

  **提交**: 否

---

- [ ] 8. 将作品页面与 Strapi 集成

  **要做的事**:
  - 安装 @nuxt/strapi: `npm install @nuxt/strapi`
  - 配置 nuxt.config.ts:
    ```typescript
    export default defineNuxtConfig({
      modules: ['@nuxt/strapi'],
      strapi: {
        url: process.env.STRAPI_URL || 'https://your-project.strapi.cloud',
        prefix: '/api',
        version: 'v4'
      }
    })
    ```
  - 创建 .env 文件（添加到 .gitignore）:
    ```
    STRAPI_URL=https://your-project.strapi.cloud
    STRAPI_TOKEN=your-api-token
    ```
  - 在 Strapi 管理面板中生成 API 令牌: 设置 → API 令牌 → 创建
  - 修改 `pages/gallery/index.vue`:
    - 导入: `import { useStrapiFind } from '#imports'`
    - 用以下代码替换硬编码的 `photos` 数组:
      ```typescript
      const { data: photos } = await useStrapiFind('photos', {
        populate: '*'
      })
      ```
    - 转换 Strapi 响应以匹配 Photo 接口
    - 保持现有 UI/UX 完全相同
  - 测试: 导航到 /gallery，验证照片从 API 加载

  **禁止做的事**:
  - 不要更改 UI 布局或样式
  - 不要在客户端代码中暴露 API 令牌

  **推荐的代理配置**:
  - **分类**: `unspecified-high`
    - 理由: 前端与 API 集成

  **并行化**:
  - **可并行运行**: 是
  - **并行组**: 第二阶段（与任务 9、10、11）
  - **阻塞**: 无（最终集成）
  - **被阻塞**: 任务 4

  **参考**:
  - @nuxt/strapi 模块: https://nuxt.com/modules/@nuxt/strapi
  - 原文件: `pages/gallery/index.vue`

  **验收标准**:
  - [ ] @nuxt/strapi 已安装
  - [ ] nuxt.config.ts 配置了 Strapi 模块
  - [ ] 设置环境变量（使用占位符值）
  - [ ] 作品页面从 Strapi API 获取数据
  - [ ] 照片显示正确，UI 与之前相同
  - [ ] 分类筛选功能正常

  **提交**: 是
  - 消息: `feat: integrate gallery with Strapi CMS`
  - 文件: `nuxt.config.ts`, `.env`, `pages/gallery/index.vue`

---

- [ ] 9. 将时间线页面与 Strapi 集成

  **要做的事**:
  - 修改 `pages/timeline.vue`:
    - 导入: `import { useStrapiFind } from '#imports'`
    - 用以下代码替换硬编码的 `timelineData`:
      ```typescript
      const { data: timelineData } = await useStrapiFind('timeline-events', {
        populate: 'photos'
      })
      ```
    - 转换 Strapi 响应以匹配现有格式
    - 保持现有时间线 UI/UX
  - 测试: 导航到 /timeline，验证时间线从 API 加载

  **禁止做的事**:
  - 不要更改时间线布局或样式

  **推荐的代理配置**:
  - **分类**: `unspecified-high`
    - 理由: 前端集成

  **并行化**:
  - **可并行运行**: 是
  - **并行组**: 第二阶段（与任务 8、10、11）
  - **阻塞**: 无
  - **被阻塞**: 任务 5

  **参考**:
  - @nuxt/strapi 文档
  - 原文件: `pages/timeline.vue`

  **验收标准**:
  - [ ] 时间线页面从 Strapi API 获取数据
  - [ ] 所有 3 个时代显示正确
  - [ ] 每个时代的照片显示正确
  - [ ] 布局不变

  **提交**: 是
  - 消息: `feat: integrate timeline with Strapi CMS`
  - 文件: `pages/timeline.vue`

---

- [ ] 10. 将关于页面与 Strapi 集成

  **要做的事**:
  - 修改 `pages/about.vue`:
    - 导入: `import { useStrapi } from '#imports'`
    - 用以下代码替换硬编码内容:
      ```typescript
      const { find } = useStrapi()
      const { data: about } = await useAsyncData('about', () => 
        find('about', { populate: '*' })
      )
      ```
    - 转换响应以提取字段
    - 更新模板使用 `about.value?.attributes`
  - 测试: 导航到 /about，验证内容从 API 加载

  **禁止做的事**:
  - 不要更改艺术家照片或布局

  **推荐的代理配置**:
  - **分类**: `unspecified-high`
    - 理由: 前端集成

  **并行化**:
  - **可并行运行**: 是
  - **并行组**: 第二阶段（与任务 8、9、11）
  - **阻塞**: 无
  - **被阻塞**: 任务 6

  **参考**:
  - 原文件: `pages/about.vue`

  **验收标准**:
  - [ ] 关于页面从 Strapi 获取数据
  - [ ] 艺术家姓名、简介显示正确
  - [ ] 展览列表显示
  - [ ] 媒体报道链接显示
  - [ ] 布局不变

  **提交**: 是
  - 消息: `feat: integrate about page with Strapi CMS`
  - 文件: `pages/about.vue`

---

- [ ] 11. 将联系方式页面与 Strapi 集成

  **要做的事**:
  - 修改 `pages/contact.vue`:
    - 导入: `import { useStrapi } from '#imports'`
    - 用以下代码替换硬编码联系方式:
      ```typescript
      const { find } = useStrapi()
      const { data: contact } = await useAsyncData('contact', () => 
        find('contact')
      )
      ```
    - 更新模板使用 `contact.value?.attributes?.email` 和 `phone`
  - 测试: 导航到 /contact，验证信息从 API 加载

  **禁止做的事**:
  - 不要更改表单功能

  **推荐的代理配置**:
  - **分类**: `unspecified-high`
    - 理由: 前端集成

  **并行化**:
  - **可并行运行**: 是
  - **并行组**: 第二阶段（与任务 8、9、10）
  - **阻塞**: 无
  - **被阻塞**: 任务 7

  **参考**:
  - 原文件: `pages/contact.vue`

  **验收标准**:
  - [ ] 联系方式页面从 Strapi 获取 email 和 phone
  - [ ] 联系方式显示正确
  - [ ] 表单功能正常（不变）

  **提交**: 是
  - 消息: `feat: integrate contact page with Strapi CMS`
  - 文件: `pages/contact.vue`

---

- [ ] 12. 编写自动化测试

  **要做的事**:
  - 创建测试文件: `tests/strapi-integration.test.ts`
  - 测试用例:
    1. **API 响应结构**: 验证 Photo 响应包含必需字段
    2. **时间线响应**: 验证时间线事件结构
    3. **关于响应**: 验证关于单例类型字段
    4. **联系方式响应**: 验证联系方式字段存在
    5. **错误处理**: 测试 API 不可用时的优雅失败
  - 使用 vitest 和模拟响应
  - 运行: `npm test`

  **禁止做的事**:
  - 不要测试实际的 Strapi API（使用模拟）
  - 不要破坏现有功能

  **推荐的代理配置**:
  - **分类**: `unspecified-high`
    - 理由: 编写测试

  **并行化**:
  - **可并行运行**: 否
  - **并行组**: 第二阶段（最终）
  - **阻塞**: 无
  - **被阻塞**: 任务 3, 8, 9, 10, 11

  **参考**:
  - Vitest 文档: https://vitest.dev/api/
  - Nuxt 中的示例测试: https://nuxt.com/docs/getting-started/testing

  **验收标准**:
  - [ ] 在 tests/strapi-integration.test.ts 创建测试文件
  - [ ] 至少 5 个测试用例
  - [ ] 所有测试通过: `npm test` → 5 passed
  - [ ] 测试使用正确的模拟

  **提交**: 是
  - 消息: `test: add Strapi integration tests`
  - 文件: `tests/strapi-integration.test.ts`
  - 提交前: `npm test`

---

## 提交策略

| 任务完成后 | 消息 | 文件 | 验证 |
|------------|------|------|------|
| 3 | `test: add vitest infrastructure` | vitest.config.ts, package.json | npm test |
| 8 | `feat: integrate gallery with Strapi CMS` | nuxt.config.ts, .env, gallery/index.vue | 手动验证 |
| 9 | `feat: integrate timeline with Strapi CMS` | timeline.vue | 手动验证 |
| 10 | `feat: integrate about page with Strapi CMS` | about.vue | 手动验证 |
| 11 | `feat: integrate contact page with Strapi CMS` | contact.vue | 手动验证 |
| 12 | `test: add Strapi integration tests` | tests/strapi-integration.test.ts | npm test |

---

## 成功标准

### 验证命令
```bash
# 测试套件
npm test  # 预期: 所有测试通过

# 手动验证（通过浏览器）
# 访问:
# - http://localhost:3000/gallery → 照片从 API 加载
# - http://localhost:3000/timeline → 时间线从 API 加载
# - http://localhost:3000/about → 关于页面从 API 加载
# - http://localhost:3000/contact → 联系方式从 API 加载
```

### 最终检查清单
- [ ] 所有"必备功能"存在
- [ ] 所有"禁止功能"不存在
- [ ] 所有测试通过
- [ ] 唐老师可以通过 Strapi 管理面板管理内容
- [ ] 前端从 Strapi API 显示数据

---

## 唐老师使用文档（待创建）

实施后，创建简明中文指南:

**内容管理后台使用说明**
1. 访问: [Strapi项目URL]/admin
2. 登录账号
3. 左侧菜单:
   - **作品**: 添加/编辑摄影作品
   - **时间线**: 编辑时代节点
   - **关于**: 编辑艺术家简介
   - **联系方式**: 更新邮箱和电话
4. 每次修改后点击"发布"按钮
5. 前台网站会自动显示最新内容
