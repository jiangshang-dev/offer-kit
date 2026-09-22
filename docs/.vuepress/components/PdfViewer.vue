<template>
  <div class="pdf-viewer">
    <div class="pdf-toolbar">
      <span class="pdf-title">{{ title || "PDF 预览" }}</span>
      <div class="pdf-actions">
        <a class="pdf-btn" :href="openHref" target="_blank" rel="noopener">
          新窗口打开
        </a>
        <a
          class="pdf-btn ghost"
          :href="downloadSrc"
          target="_blank"
          rel="noopener"
        >
          下载
        </a>
      </div>
    </div>
    <div class="pdf-frame-wrap">
      <iframe
        v-if="previewSrc"
        class="pdf-frame"
        :src="previewSrc"
        :title="title || 'PDF'"
      />
      <div v-else class="pdf-status">{{ statusText }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { withBase } from "vuepress/client";

const props = defineProps<{
  src: string;
  title?: string;
}>();

const previewSrc = ref("");
const statusText = ref("正在加载 PDF…");
const blobUrl = ref("");

const downloadSrc = computed(() =>
  /^https?:\/\//i.test(props.src) ? props.src : withBase(encodeURI(props.src)),
);

const openHref = computed(() => previewSrc.value || downloadSrc.value);

/**
 * OSS 强制 attachment，需经同源 /__oss 代理改写为 inline。
 * 生产环境路径要带 base，例如 /offer/__oss/...
 */
const toProxyPath = (src: string): string | null => {
  try {
    if (!/^https?:\/\//i.test(src)) return null;
    const u = new URL(src);
    if (!u.hostname.includes("aliyuncs.com")) return null;
    const encodedPath = u.pathname
      .split("/")
      .map((seg) => {
        if (!seg) return "";
        try {
          return encodeURIComponent(decodeURIComponent(seg));
        } catch {
          return encodeURIComponent(seg);
        }
      })
      .join("/");
    // withBase 保证部署在 /offer/ 时请求 /offer/__oss/...
    return withBase(`/__oss${encodedPath}${u.search}`);
  } catch {
    return null;
  }
};

const revokeBlob = () => {
  if (blobUrl.value) {
    URL.revokeObjectURL(blobUrl.value);
    blobUrl.value = "";
  }
};

const looksLikePdf = (buf: ArrayBuffer) => {
  const head = new Uint8Array(buf.slice(0, 5));
  return (
    head.length >= 5 &&
    head[0] === 0x25 &&
    head[1] === 0x50 &&
    head[2] === 0x44 &&
    head[3] === 0x46 &&
    head[4] === 0x2d
  ); // %PDF-
};

const loadPdf = async () => {
  revokeBlob();
  previewSrc.value = "";
  statusText.value = "正在加载 PDF…";

  const proxyPath = toProxyPath(props.src);
  const candidates = [
    proxyPath,
    /^https?:\/\//i.test(props.src) ? props.src : null,
    !/^https?:\/\//i.test(props.src) ? withBase(encodeURI(props.src)) : null,
  ].filter(Boolean) as string[];

  let lastError: unknown = null;

  for (const fetchUrl of candidates) {
    try {
      const res = await fetch(fetchUrl, { credentials: "omit" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = await res.arrayBuffer();
      if (!looksLikePdf(buf)) {
        throw new Error("响应不是 PDF（可能是 HTML 404 页）");
      }
      const url = URL.createObjectURL(
        new Blob([buf], { type: "application/pdf" }),
      );
      blobUrl.value = url;
      previewSrc.value = url;
      statusText.value = "";
      return;
    } catch (err) {
      lastError = err;
    }
  }

  console.error("[PdfViewer]", lastError);
  statusText.value =
    "预览失败：生产环境请配置 Nginx /__oss 代理，或点击右上角「下载」。";
};

onMounted(loadPdf);
watch(() => props.src, loadPdf);
onBeforeUnmount(revokeBlob);
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

.pdf-status {
  height: 100%;
  display: grid;
  place-items: center;
  padding: 1.5rem;
  color: #e2e8f0;
  text-align: center;
  line-height: 1.6;
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
