import { createRequire } from "node:module";
import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

const require = createRequire(import.meta.url);
const mermaidComponentPath = require.resolve(
  "@vuepress/plugin-markdown-chart/client/components/Mermaid.js",
);

export default defineUserConfig({
  // Use DOCS_DEST for a one-off deployment build without changing the normal output.
  dest: process.env.DOCS_DEST ?? "./dist",
  // 本地默认 /；线上挂在 nginx 子路径时必须带尾部斜杠，例如 BASE=/offer/
  // 打包：BASE=/offer/ pnpm docs:build
  base: process.env.BASE ?? "/",

  title: "OfferKit",
  description:
    "OfferKit 是姜小白整理的后端面试与知识体系，覆盖 Java、数据库/MySQL、Redis、分布式、高并发、高可用、系统设计等核心知识。",
  lang: "zh-CN",

  head: [
    // meta
    ["meta", { name: "robots", content: "all" }],
    ["meta", { name: "author", content: "姜小白" }],
    // [
    //   "meta",
    //   {
    //     name: "keywords",
    //     content:
    //       "OfferKit, 后端面试, 后端开发, Java面试, Java基础, 并发编程, JVM, 数据库, MySQL, Redis, Spring, 分布式, 高并发, 高性能, 高可用, 系统设计, 消息队列, 缓存, 计算机网络, Linux",
    //   },
    // ],
    // [
    //   "meta",
    //   {
    //     name: "description",
    //     content:
    //       "OfferKit 是一份面向后端开发/后端面试的学习与复习指南，覆盖 Java、数据库/MySQL、Redis、分布式、高并发、高可用、系统设计等核心知识。",
    //   },
    // ],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
  ],

  bundler: viteBundler({
    viteOptions: {
      resolve: {
        alias: {
          "@vuepress/plugin-markdown-chart/client/components/Mermaid.js":
            mermaidComponentPath,
        },
      },
      css: {
        preprocessorOptions: {
          scss: {
            silenceDeprecations: ["if-function"],
          },
        },
      },
      // 软考 PDF：OSS 强制 Content-Disposition: attachment，开发态经同源代理改为 inline 才能预览
      server: {
        proxy: {
          "/__oss": {
            target: "https://dinenova.oss-cn-beijing.aliyuncs.com",
            changeOrigin: true,
            secure: true,
            rewrite: (path) => path.replace(/^\/__oss/, ""),
            configure: (proxy) => {
              proxy.on("proxyRes", (proxyRes) => {
                proxyRes.headers["content-disposition"] = "inline";
                delete proxyRes.headers["x-oss-force-download"];
              });
            },
          },
        },
      },
    },
  }),

  theme,

  pagePatterns: [
    "**/*.md",
    "!**/*.snippet.md",
    "!**/TODO.md",
    "!.vuepress",
    "!node_modules",
  ],

  shouldPrefetch: false,
  shouldPreload: false,
});
