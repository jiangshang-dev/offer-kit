import { arraySidebar } from "vuepress-theme-hope";

export const ruankao = arraySidebar([
  "",
  {
    text: "讲义资料",
    icon: "mdi:file-pdf-box",
    collapsible: false,
    children: [
    { text: "专业英语高频词汇表", link: "english-vocab" },
    { text: "思维导图【学员版】", link: "mindmap" },
    { text: "三色笔记【学员版】", link: "tricolor-notes" },
    { text: "易混淆知识点【学员版】", link: "confusable" },
    { text: "架构知识点集锦精华版", link: "arch-essentials" },
    { text: "核心宝典【学员版】", link: "core-handbook" },
    { text: "案例提炼", link: "case-digest" },
    { text: "案例模拟题合集【学员版】", link: "case-mocks" },
    { text: "经典 100 题【学员版】", link: "classic-100" },
    { text: "考点自查清单【学员版】", link: "checklist" },
    { text: "论文提炼", link: "essay-digest" },
    { text: "论文范文", link: "essay-samples" },
    { text: "重要知识点 100 条【学员版】", link: "key-100" },
    ],
  },
]);
