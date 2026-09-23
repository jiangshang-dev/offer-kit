# OfferKit

姜小白的 Java / 后端面试笔记站点，基于 VuePress + vuepress-theme-hope。

## 功能

- 面试题知识体系（Java / 数据库 / 计算机基础 / 分布式 / 系统设计 / AI）
- 点击「阅读全文」关注公众号「架构师姜小白」，回复「验证码」解锁
- 关于作者、GitHub 与个人博客入口

## 本地启动

```bash
pnpm install
ulimit -n 65536
CHOKIDAR_USEPOLLING=1 pnpm docs:dev
```

## 打包
```bash
cd /Users/xiaobai/Deveploer/workspace/lingxi/blog
pnpm docs:build:offer
# 等价于：BASE=/offer/ pnpm docs:build
```

关注公众号「架构师姜小白」，回复「验证码」解锁。

## 相关链接

- GitHub: https://github.com/jiangshang-dev?tab=repositories
- 博客: https://alibabap8developer.github.io/myblog/
- 面试笔记: https://www.mianshi-offer.cn/offer/
