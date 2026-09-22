import { navbar } from "vuepress-theme-hope";

export default navbar([
  { text: "后端面试", icon: "mdi:language-java", link: "/home.md" },
  { text: "计算机基础", icon: "mdi:desktop-classic", link: "/cs-basics/" },
  { text: "AI 应用", icon: "mdi:robot-outline", link: "/ai/" },
  { text: "AI 编程", icon: "mdi:code-tags", link: "/ai-coding/" },
  {
    text: "推荐阅读",
    icon: "mdi:book-open-page-variant-outline",
    children: [
      { text: "学习路线", icon: "mdi:map-outline", link: "/roadmap/" },
      { text: "开源项目", icon: "mdi:github", link: "/open-source-project/" },
      {
        text: "技术书籍",
        icon: "mdi:book-open-page-variant-outline",
        link: "/books/",
      },
    ],
  },
  {
    text: "关于",
    icon: "mdi:information-outline",
    children: [
      {
        text: "关于作者",
        icon: "mdi:account-edit-outline",
        link: "/about-the-author/",
      },
      {
        text: "个人博客",
        icon: "mdi:web",
        link: "https://alibabap8developer.github.io/myblog/",
      },
      {
        text: "GitHub",
        icon: "mdi:github",
        link: "https://github.com/jiangshang-dev?tab=repositories",
      },
      {
        text: "面试准备",
        icon: "mdi:file-pdf-box",
        link: "/interview-preparation/",
      },
    ],
  },
]);
