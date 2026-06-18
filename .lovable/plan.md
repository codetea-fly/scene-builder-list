## 数字孪生场景创新公共服务平台 — 多页面架构搭建

### 总体方案

基于现有 `src/routes/index.tsx` 的"场景建设需求清单"浅色蓝白风格（渐变 sky→white→blue 背景、blob 模糊球、网格、blur 卡片、淡入动画），抽出公共背景组件 `SceneBackground` 和顶部 `NavBar`（带二/三级菜单的下拉），所有页面统一使用。

### 1. 通用组件（新建）

- `src/components/SceneBackground.tsx`：从 index.tsx 中抽出的 blob + grid 背景，所有页面包裹使用。
- `src/components/NavBar.tsx`：粘性顶部导航，5 个一级菜单，hover/点击展开下拉面板，支持二级 label + 三级链接。Logo 链接首页。
- `src/components/PageShell.tsx`：背景 + NavBar + `<Outlet/>`，挂在 `__root.tsx`。
- `src/components/SectionTitle.tsx`、卡片/统计/筛选等小组件按需复用现有样式。

### 2. 导航菜单结构

```text
场景图谱
  ├─ 全景式场景图谱           /atlas/overview         （仅占位）
  └─ 场景需求清单             /atlas/demands          （从首页迁移）
场景资源社区
  ├─ 资源库（label）
  │   ├─ 解决方案 / 规范标准库 / 开源技术资源库 / 案例库（占位路由）
  ├─ 生态圈（label）
  │   ├─ 专家库 / 大会活动（占位路由）
  └─ 创新中心产品体系专题       （占位）
场景创新促进中心
  ├─ 场景创新全过程服务体系   /promotion/lifecycle    （新建详细页）
  ├─ 场景服务咨询 / 场景征集活动 / 场景成熟度评估中心（占位）
场景创新实验室
  ├─ 场景创新广场             /lab/plaza              （新建详细页 20 卡片）
  ├─ 能力组件中心
  │   ├─ 通用能力组件         /lab/capability/components
  │   ├─ 通用能力平台         /lab/capability/platforms
  │   ├─ 在线体验系统         /lab/capability/experience
  │   ├─ 特定领域软硬件        /lab/capability/hardware
  │   └─ AI+数字孪生能力库     /lab/capability/ai-twin
  └─ 数据资产中心
      ├─ 三维模型库            /lab/data/models
      ├─ 高质量数据集          /lab/data/datasets
      └─ 可归集孪生体资产       /lab/data/twins
场景示范体验中心
  └─ 在线体验中心 / SIP实践 / 创新中心示范（占位）
```

占位页（用户标注"暂时不需要制作"）：统一渲染一个"建设中"的简单卡片，但路由要存在以便菜单链接可达。

### 3. 首页改造 `/`

保留 Hero（全屏 + 网格动画），后续滚动区替换为：
1. 行业资讯（4 张图文卡片，示例数据）
2. 热门场景（横向卡片网格，6 个示例）
3. 组件 / 数据资产总览数字统计（4-6 个 KPI，数字跳动动画）
4. 专业服务（5 张卡片，链接到 `/promotion/lifecycle`）
5. 创新中心生态圈（合作伙伴 logo 横向 marquee 滚动）
6. Footer

"场景建设需求清单"从首页移除，迁移到 `/atlas/demands`。

### 4. `/promotion/lifecycle` 场景创新全过程服务体系

时间轴 / 五段式卡片布局，依次展示 5 个生命周期：场景体系设计、场景挖掘与策划、场景建设与验证、场景示范与转化、场景推广与产业化，每段含图标、副标题、详细描述（用户提供的文本）。

### 5. `/lab/plaza` 场景创新广场

- 顶部标签筛选（技术标签、厂商标签等，多选）
- 网格卡片（20 个示例数字孪生场景），右上角转发按钮（toast 提示已复制链接），点击"查看详情"跳转 `/lab/plaza/$id` 详情页。
- 详情页：场景封面、标签、描述、技术栈、相关组件。

### 6. 能力组件中心 5 个总览页

通用模板 `CapabilityListPage`：顶部 4 个数字统计卡片 + 标签筛选 + 卡片网格。每页 8-12 条示例数据。

### 7. 数据资产中心 3 个总览页

- `/lab/data/models` 三维模型库：卡片含"预览"按钮，点击弹出对话框使用 `<model-viewer>`（CDN script）或简易 Three.js `<canvas>` 渲染一个旋转立方体作为占位预览。
- `/lab/data/datasets` 高质量数据集：仿 Huggingface 风格 — 左侧筛选（任务/语言/许可），右侧数据集卡片（名称、下载数、点赞、tags、更新时间）。
- `/lab/data/twins` 可归集孪生体资产：卡片显示物理属性（材质、质量、尺寸）+ 业务属性（行业、用途、所有者）。

### 8. 风格 & 动画

继承现有：`from-sky-50 via-white to-blue-50`、`animate-fade-in`、`animate-blob`、`hover:-translate-y-1`、白底毛玻璃卡片 + sky 边框 + sky/blue 渐变高亮。新增 marquee 关键帧（合作伙伴滚动），number-up 动画（KPI 统计）。

### 技术细节

- 文件路由命名采用 dot-separated：`atlas.demands.tsx`、`lab.plaza.tsx`、`lab.plaza.$id.tsx`、`lab.capability.components.tsx` 等。
- `__root.tsx` 用 `<NavBar/> + <SceneBackground/> + <Outlet/>` 结构，移除原 root 中的 placeholder。
- 删除现有 `index.tsx` 中的需求清单部分代码，迁移到 `atlas.demands.tsx`。
- 三维预览：用轻量 `<canvas>` + 一个简化的 Three.js 旋转 demo，避免引入大型库（如已无 three 依赖则 `bun add three`）。
- Toast：复用 shadcn `sonner` 或简易自实现。

### 不在本次范围

- 真实后端 / 数据库（全部用前端 mock 数据）
- 占位菜单页面的实际内容（仅"建设中"提示）
- 详情页的真实交互（仅展示静态信息）

需要您确认后再开始落地。