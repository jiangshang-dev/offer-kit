# OfferKit

<p align="center">
  <strong>面向 Java / 后端求职的面试知识体系</strong><br/>
  覆盖 Java · 数据库 · 计算机基础 · 分布式 · 系统设计 · AI · 软考
</p>

<p align="center">
  <a href="https://www.mianshi-offer.cn/offer/"><img src="https://img.shields.io/badge/在线阅读-mianshi--offer.cn-0d9488?style=flat-square" alt="Online" /></a>
  <a href="https://github.com/jiangshang-dev"><img src="https://img.shields.io/badge/GitHub-jiangshang--dev-181717?style=flat-square&logo=github" alt="GitHub" /></a>
  <a href="https://alibabap8developer.github.io/myblog/"><img src="https://img.shields.io/badge/Blog-个人博客-0284c7?style=flat-square" alt="Blog" /></a>
  <img src="https://img.shields.io/badge/VuePress-2.x-3eaf7c?style=flat-square&logo=vue.js" alt="VuePress" />
</p>

---

> **如果你觉得有帮助，请顺手点一下右上角 Star。**  
> 内容持续整理维护，Star 是对开源最直接的反馈；白嫖也能学，但支持一下会走得更远。

## 在线地址

- 面试笔记（推荐）：https://www.mianshi-offer.cn/offer/
- 个人博客：https://alibabap8developer.github.io/myblog/
- GitHub：https://github.com/jiangshang-dev?tab=repositories

## 项目简介

OfferKit 是基于 **VuePress 2 + vuepress-theme-hope** 搭建的后端面试文档站，面向校招 / 社招 / 跳槽复习场景，把高频面试题与知识体系按模块整理，方便检索与系统复习。

作者：姜小白（公众号：**架构师姜小白**）

## 内容与能力

| 模块 | 说明 |
| --- | --- |
| Java | 基础 / 集合 / 并发 / JVM / 新特性 |
| 数据库 | MySQL / Redis / MongoDB / SQL / ES |
| 计算机基础 | 网络 / 操作系统 / 数据结构与算法 |
| 架构向 | 分布式 / 高性能 / 高可用 / 系统设计 |
| AI | AI 应用开发 / AI 编程实践 |
| 软考 | 系统架构设计师讲义（OSS 在线预览） |

其他能力：

- 「阅读全文」人机验证：关注公众号回复「验证码」解锁
- 响应式文档布局、侧边栏导航、沉浸式阅读
- 支持子路径部署（如 Nginx `/offer/`）

## 技术栈

- VuePress `2.x`（Vite bundler）
- vuepress-theme-hope
- pnpm

## 本地开发

```bash
pnpm install

# macOS 文档较多时建议提高文件监视上限，避免 EMFILE
ulimit -n 65536
CHOKIDAR_USEPOLLING=1 pnpm docs:dev
```

浏览器访问控制台输出的本地地址即可。

## 打包部署

### 子路径部署（当前线上 `/offer/`）

```bash
pnpm docs:build:offer
# 等价于：BASE=/offer/ pnpm docs:build
```

将生成的 `dist/` 同步到服务器目录（示例）：

```bash
# 例如 Docker 挂载：/home/docker/offer-kit/dist -> /var/www/offer
rsync -avz --delete dist/ user@server:/home/docker/offer-kit/dist/
```

Nginx 需匹配 `base`，示例：

```nginx
location /offer/ {
    alias /var/www/offer/;
    index index.html;
    try_files $uri $uri/ /offer/index.html;
}
```

### 根路径部署

```bash
pnpm docs:build
```

## 目录结构（简要）

```text
blog/
├── docs/                 # 文档源码与 Markdown
│   ├── .vuepress/        # 站点配置、主题、组件
│   ├── java/             # Java 面试
│   ├── database/         # 数据库
│   ├── ruankao/          # 软考模块
│   └── ...
├── scripts/              # 构建与同步脚本
├── deploy/               # 部署相关片段
└── package.json
```

## 支持与反馈

如果本项目对你有帮助：

1. **点个 Star**（最重要）
2. 关注公众号「架构师姜小白」，获取更新与验证码
3. 有问题或建议可通过 GitHub Issues / 博客留言反馈

开源不易，整理面试资料更不易。欢迎使用，也请不要只带走内容不留下 Star。

## 相关链接

- GitHub: https://github.com/jiangshang-dev?tab=repositories
- 博客: https://alibabap8developer.github.io/myblog/
- 面试笔记: https://www.mianshi-offer.cn/offer/

## License

MIT
