# Strapi 后端集成计划

## TL;DR

> **快速摘要**: 为唐西林摄影作品集 (Nuxt.js) 集成 Strapi Headless CMS，使唐老师可以通过友好后台管理作品、展览和时间年代内容。
> 
> **交付成果**: 
> - Strapi 后端服务 (本地运行)
> - 3个内容类型: 作品(Work)、展览(Exhibition)、年代(Period)
> - Nuxt 前端 API 集成层
> - 替换现有硬编码数据为动态API调用
> 
> **预计工作量**: Medium
> **并行执行**: YES - 2 waves
> **关键路径**: Strapi 内容类型定义 → Nuxt API 层 → 前端集成

---

## 背景

### 原始需求
用户希望在 tangxl-portfolio (Nuxt.js 4 摄影作品集) 项目中集成 Strapi 作为后端内容管理系统，使非技术人员的唐老师可以通过 Admin Panel 上传和管理摄影作品、展览信息。

### 访谈总结
**讨论要点**:
- **部署方式**: 本地开发 (后续可扩展到云端)
- **图片存储**: Strapi 本地存储
- **展览结构**: 简单结构 (名称、描述、时间、地点、图片)
- **测试策略**: TDD (测试驱动开发)

**现有内容结构 (需迁移)**:
- 作品 (Photos): id, title, year, location, src, width, height, category
- 时间轴 (Timeline): period, title, description, photos[]
- 分类 (Categories): 70年代, 90年代, 新世纪

### 研究发现
- Strapi v4/v5 为当前主流版本，TypeScript 支持完善
- Nuxt + Strapi 集成可使用 @nuxtjs/strapi 或原生 fetch
- 本地存储需要配置 media library

---

## 工作目标

### 核心目标
在本地环境中搭建 Strapi 后端服务，创建作品、展览、年代三个内容类型，并在 Nuxt 前端实现 API 集成，替换现有的硬编码数据。

### 具体交付物
1. Strapi 后端项目 (本地运行在 port 1337)
2. Admin Panel 可访问 (port 1337/admin)
3. 3个内容类型的定义和配置
4. Nuxt 前端 API 集成层 (composables)
5. 页面数据从 Strapi 获取 (gallery, timeline)

### 完成定义
- [ ] Strapi 服务本地启动成功
- [ ] Admin Panel 可登录使用
- [ ] 三个内容类型可在后台管理
- [ ] 前端页面正确展示 Strapi 数据
- [ ] 所有测试通过 (TDD)

### 必须有
- 作品管理: 标题、年份、地点、图片、分类
- 展览管理: 名称、描述、日期、地点、图片
- 年代管理: 时期名称、描述、关联作品

### 禁止 (防护栏)
- 暂不包含用户认证系统
- 暂不部署到云端
- 暂不使用第三方存储 (Cloudinary/S3)
- 不修改现有 UI 样式和布局

---

## 验证策略 (TDD)

### 测试决策
- **基础设施**: 新建，需要设置
- **用户需求测试**: TDD (测试驱动开发)
- **框架**: vitest (与 Nuxt 生态兼容)

### 任务结构 (RED-GREEN-REFACTOR)
1. **RED**: 先写失败的测试
   - 测试文件: `tests/strapi.test.ts`
   - 测试命令: `npm run test`
   - 预期: FAIL (API 未连接，数据未获取)
2. **GREEN**: 实现最小代码通过测试
   - 命令: `npm run test`
   - 预期: PASS
3. **REFACTOR**: 重构保持绿色
   - 命令: `npm run test`
   - 预期: PASS (仍然)

### 测试基础设施任务
- [ ] 0. 设置测试环境
  - 安装: `npm install -D vitest @nuxt/test-utils`
  - 配置: 创建 `vitest.config.ts`
  - 验证: `npm run test` → 显示测试帮助

---

## 执行策略

### 并行执行 Waves

```
Wave 1 (立即启动):
├── Task 1: 创建 Strapi 项目并配置
└── Task 2: 定义内容类型 (Work, Exhibition, Period)

Wave 2 (After Wave 1):
├── Task 3: 迁移示例数据到 Strapi
├── Task 4: Nuxt API 集成层
├── Task 5: Gallery 页面集成 (TDD)
└── Task 6: Timeline 页面集成 (TDD)
```

### 依赖矩阵

| 任务 | 依赖 | 阻塞 | 可并行 |
|------|------|------|--------|
| 1 | None | 3, 4 | 2 |
| 2 | None | 3 | 1 |
| 3 | 1, 2 | None | None |
| 4 | 1 | 5, 6 | None |
| 5 | 4 | None | 6 |
| 6 | 4 | None | 5 |

---

## TODOs

- [ ] 1. 创建 Strapi 项目并配置本地环境

  **工作内容**:
  - 初始化 Strapi 项目 (npx create-strapi-app@latest)
  - 配置本地文件存储
  - 设置开发环境变量 (.env)
  - 启动 Strapi 服务 (port 1337)
  - 创建管理员账户

  **禁止**:
  - 不配置云存储
  - 不设置 HTTPS

  **推荐 Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: 后端服务搭建，需要 Node.js 经验和命令行操作
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `git-master`: 不需要 Git 操作 (项目级)

  **并行化**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Task 2)
  - **Blocks**: Task 3, Task 4
  - **Blocked By**: None

  **References**:
  - Strapi 官方文档: `https://docs.strapi.io/` - 入门指南
  - `tangxl-portfolio/package.json` - 了解现有 Node 版本要求

  **验收标准**:
  - [ ] Strapi 服务运行: curl http://localhost:1337 → 返回 API 信息
  - [ ] Admin Panel 可访问: http://localhost:1337/admin
  - [ ] 可创建管理员账户

  **Commit**: YES
  - Message: `feat(backend): init strapi project`
  - Files: `strapi-backend/`

---

- [ ] 2. 定义 Strapi 内容类型 (Work, Exhibition, Period)

  **工作内容**:
  - 创建 "作品" (Work) 内容类型:
    - title (Text, required)
    - year (Text)
    - location (Text)
    - image (Media, single)
    - width (Number)
    - height (Number)
    - category (Relation → Category)
  - 创建 "年代" (Period) 内容类型:
    - period (Text, required, e.g., "1970s")
    - title (Text, required)
    - description (Rich Text)
    - works (Relation → Work, many)
  - 创建 "展览" (Exhibition) 内容类型:
    - name (Text, required)
    - description (Rich Text)
    - date (Date)
    - location (Text)
    - images (Media, multiple)
  - 创建 "分类" (Category) 内容类型:
    - name (Text, required, e.g., "70年代")
    - value (Text, unique, e.g., "1970s")
  - 配置内容类型权限 (Public API access)

  **禁止**:
  - 不添加复杂字段
  - 不创建自定义 API 控制器

  **推荐 Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Strapi 后台配置，需要理解数据结构
  - **Skills**: []

  **并行化**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Task 1)
  - **Blocks**: Task 3
  - **Blocked By**: None

  **References**:
  - `pages/gallery/index.vue` - 当前作品数据结构
  - `pages/timeline.vue` - 当前年代数据结构

  **验收标准**:
  - [ ] Work 类型可创建: POST /api/works
  - [ ] Period 类型可创建: GET /api/periods
  - [ ] Exhibition 类型可创建: POST /api/exhibitions
  - [ ] Category 类型可创建: GET /api/categories
  - [ ] Public 权限已开放

  **Commit**: YES
  - Message: `feat(backend): define content types`
  - Files: `strapi-backend/src/api/`

---

- [ ] 3. 迁移示例数据到 Strapi

  **工作内容**:
  - 通过 Admin Panel 或 API 添加:
    - 3个 Category: 70年代 (1970s), 90年代 (1990s), 新世纪 (newCentury)
    - 9个 Work (从 gallery/index.vue 迁移)
    - 3个 Period (从 timeline.vue 迁移)
  - 上传示例图片 (可使用占位图)
  - 建立 Period 与 Works 的关联

  **禁止**:
  - 不上传真实摄影作品 (使用占位图)

  **推荐 Agent Profile**:
  - **Category**: `quick`
    - Reason: 数据迁移，手动操作为主
  - **Skills**: []

  **并行化**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 2
  - **Blocks**: None
  - **Blocked By**: Task 1, Task 2

  **References**:
  - `pages/gallery/index.vue:84-94` - 现有 9 个作品数据
  - `pages/timeline.vue:53-87` - 现有 3 个年代数据

  **验收标准**:
  - [ ] GET /api/categories → 返回 3 个分类
  - [ ] GET /api/works → 返回 9 个作品
  - [ ] GET /api/periods → 返回 3 个年代
  - [ ] 每个 Work 有关联的 Category

  **Commit**: NO (数据迁移)

---

- [ ] 4. Nuxt API 集成层 (composables)

  **工作内容**:
  - 安装依赖: `@nuxtjs/strapi` 或使用原生 fetch
  - 配置 nuxt.config.ts: 添加 Strapi URL
  - 创建 composables/useStrapi.ts:
    - useWorks(): 获取作品列表
    - useWork(id): 获取单个作品
    - usePeriods(): 获取年代列表
    - usePeriod(id): 获取单个年代
    - useExhibitions(): 获取展览列表
    - useCategories(): 获取分类列表
  - 类型定义: 定义 TypeScript 接口匹配 Strapi 响应

  **禁止**:
  - 不修改页面组件逻辑
  - 不创建新的页面路由

  **推荐 Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Nuxt 集成开发，需要 TypeScript 和 API 经验
  - **Skills**: []

  **并行化**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 5, Task 6
  - **Blocked By**: Task 1

  **References**:
  - `tangxl-portfolio/nuxt.config.ts` - Nuxt 配置参考
  - `@nuxtjs/strapi` 文档: `https://github.com/nuxt-modules/strapi`

  **验收标准**:
  - [ ] useStrapi composable 可调用
  - [ ] TypeScript 类型检查通过
  - [ ] 本地开发环境可连接 Strapi (http://localhost:1337)

  **Commit**: YES
  - Message: `feat(frontend): add strapi integration layer`
  - Files: `tangxl-portfolio/composables/`, `tangxl-portfolio/types/`

---

- [ ] 5. Gallery 页面集成 (TDD)

  **工作内容**:
  - **RED**: 先写测试
    - 测试文件: `tests/gallery.strapi.test.ts`
    - 测试: useWorks() 返回作品列表
    - 测试: useCategories() 返回分类
    - 测试: 筛选功能
  - **GREEN**: 实现
    - 修改 `pages/gallery/index.vue` 使用 composables
    - 替换硬编码的 photos 数组
    - 保持 UI 不变
  - **REFACTOR**: 重构

  **禁止**:
  - 不修改 UI 样式和布局
  - 不添加新功能

  **推荐 Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: 前端页面集成，需要 Vue/Nuxt 经验
  - **Skills**: []

  **并行化**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Task 6)
  - **Blocks**: None
  - **Blocked By**: Task 4

  **References**:
  - `pages/gallery/index.vue` - 现有实现，需替换数据源
  - `tests/gallery.strapi.test.ts` - 测试文件位置

  **验收标准**:
  - [ ] Test: `npm run test` → PASS
  - [ ] Gallery 页面 http://localhost:3000/gallery 正常显示
  - [ ] 分类筛选功能正常工作
  - [ ] 数据来自 Strapi API

  **Commit**: YES
  - Message: `feat(frontend): integrate gallery with strapi`
  - Files: `tangxl-portfolio/pages/gallery/index.vue`, `tests/`

---

- [ ] 6. Timeline 页面集成 (TDD)

  **工作内容**:
  - **RED**: 先写测试
    - 测试文件: `tests/timeline.strapi.test.ts`
    - 测试: usePeriods() 返回年代列表
    - 测试: 每个 Period 包含关联的 Works
  - **GREEN**: 实现
    - 修改 `pages/timeline.vue` 使用 composables
    - 替换硬编码的 timelineData
    - 保持 UI 不变
  - **REFACTOR**: 重构

  **禁止**:
  - 不修改 UI 样式和布局
  - 不添加新功能

  **推荐 Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: 前端页面集成，需要 Vue/Nuxt 经验
  - **Skills**: []

  **并行化**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Task 5)
  - **Blocks**: None
  - **Blocked By**: Task 4

  **References**:
  - `pages/timeline.vue` - 现有实现，需替换数据源

  **验收标准**:
  - [ ] Test: `npm run test` → PASS
  - [ ] Timeline 页面 http://localhost:3000/timeline 正常显示
  - [ ] 年代与作品的关联正确显示
  - [ ] 数据来自 Strapi API

  **Commit**: YES
  - Message: `feat(frontend): integrate timeline with strapi`
  - Files: `tangxl-portfolio/pages/timeline.vue`, `tests/`

---

## 提交策略

| 任务后 | 消息 | 文件 | 验证 |
|--------|------|------|------|
| 1 | `feat(backend): init strapi project` | strapi-backend/ | curl localhost:1337 |
| 2 | `feat(backend): define content types` | strapi-backend/src/api/ | API 端点可访问 |
| 4 | `feat(frontend): add strapi integration` | composables/, types/ | npm run test |
| 5 | `feat(frontend): integrate gallery` | pages/gallery/, tests/ | npm run test |
| 6 | `feat(frontend): integrate timeline` | pages/timeline/, tests/ | npm run test |

---

## 成功标准

### 验证命令
```bash
# Strapi 后端
curl http://localhost:1337/api/works | jq '.data | length'  # 预期: 9
curl http://localhost:1337/api/periods | jq '.data | length'  # 预期: 3
curl http://localhost:1337/api/categories | jq '.data | length' # 预期: 3

# Nuxt 前端
curl http://localhost:3000/gallery | grep -q "作品浏览"  # 预期: 0 (存在)
curl http://localhost:3000/timeline | grep -q "时间轴"  # 预期: 0 (存在)

# 测试
npm run test  # 预期: All tests PASS
```

### 最终检查清单
- [ ] 所有 "必须有" 已实现
- [ ] 所有 "禁止" 已遵守
- [ ] 所有测试通过
- [ ] 前端页面正常显示数据
- [ ] Admin Panel 可用于内容管理
