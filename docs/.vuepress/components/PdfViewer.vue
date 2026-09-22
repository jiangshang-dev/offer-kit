<template>
  <div class="pdf-viewer">
    <div class="pdf-toolbar">
      <span class="pdf-title">{{ title || "PDF 预览" }}</span>
      <div class="pdf-actions">
        <a class="pdf-btn" :href="resolvedSrc" target="_blank" rel="noopener">
          新窗口打开
        </a>
        <a class="pdf-btn ghost" :href="resolvedSrc" :download="downloadName">
          下载
        </a>
      </div>
    </div>
    <div class="pdf-frame-wrap">
      <iframe
        class="pdf-frame"
        :src="resolvedSrc"
        :title="title || 'PDF'"
        loading="lazy"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { withBase } from "vuepress/client";

const props = defineProps<{
  src: string;
  title?: string;
}>();

const resolvedSrc = computed(() => {
  const raw = props.src.startsWith("http")
    ? props.src
    : withBase(encodeURI(props.src));
  // Chrome/Safari 内置阅读器：带 #toolbar=1 便于翻页
  return raw.includes("#") ? raw : `${raw}#toolbar=1&navpanes=0`;
});

const downloadName = computed(() => {
  try {
    const path = decodeURIComponent(props.src.split("/").pop() || "document.pdf");
    return path;
  } catch {
    return "document.pdf";
  }
});
</script>

<style scoped>
.pdf-viewer {
  margin: 1rem 0 1.5rem;
  border: 1px solid var(--offerkit-border, #e2e8f0);
  border-radius: 12px;
  overflow: hidden;
  background: var(--bg-color, #fff);
}

.pdf-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0.7rem 1rem;
  border-bottom: 1px solid var(--offerkit-border, #e2e8f0);
  background: var(--offerkit-surface, #f8fafc);
}

.pdf-title {
  font-weight: 600;
  color: var(--offerkit-ink, #0f172a);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.pdf-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.pdf-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.28rem 0.75rem;
  border-radius: 999px;
  background: #0d9488;
  color: #fff !important;
  text-decoration: none !important;
  font-size: 0.85rem;
  font-weight: 600;
}

.pdf-btn.ghost {
  background: transparent;
  color: #0d9488 !important;
  border: 1px solid rgba(13, 148, 136, 0.45);
}

.pdf-frame-wrap {
  height: min(78vh, 920px);
  background: #525659;
}

.pdf-frame {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
  background: #525659;
}

@media (max-width: 768px) {
  .pdf-toolbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .pdf-frame-wrap {
    height: 70vh;
  }
}
</style>
