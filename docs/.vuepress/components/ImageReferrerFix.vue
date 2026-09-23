<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { useRouter } from "vuepress/client";

const applyNoReferrer = () => {
  if (typeof document === "undefined") return;
  document.querySelectorAll("img").forEach((img) => {
    if (img.getAttribute("referrerpolicy") !== "no-referrer") {
      img.setAttribute("referrerpolicy", "no-referrer");
    }
    // 已因防盗链失败的图，去掉 Referer 后强制重载（每张只重试一次）
    if (
      img.complete &&
      img.naturalWidth === 0 &&
      img.src &&
      img.dataset.refRetry !== "1"
    ) {
      img.dataset.refRetry = "1";
      const { src } = img;
      img.src = "";
      img.src = src;
    }
  });
};

let observer: MutationObserver | null = null;
const router = useRouter();
let stopAfterEach: (() => void) | null = null;

onMounted(() => {
  applyNoReferrer();
  observer = new MutationObserver(() => applyNoReferrer());
  observer.observe(document.body, { childList: true, subtree: true });
  stopAfterEach = router.afterEach(() => {
    requestAnimationFrame(applyNoReferrer);
  });
});

onUnmounted(() => {
  observer?.disconnect();
  stopAfterEach?.();
});
</script>

<template></template>
