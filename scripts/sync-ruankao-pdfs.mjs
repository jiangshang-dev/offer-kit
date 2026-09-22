import { createWriteStream } from "node:fs";
import { mkdir, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "../docs/.vuepress/public/ruankao");
const force = process.argv.includes("--force");

const files = [
  "https://dinenova.oss-cn-beijing.aliyuncs.com/ruankao/2026%E4%B8%8B%E5%8D%8A%E5%B9%B4%E7%B3%BB%E7%BB%9F%E6%9E%B6%E6%9E%84%E8%AE%BE%E8%AE%A1%E5%B8%88%E4%B8%93%E4%B8%9A%E8%8B%B1%E8%AF%AD%E9%AB%98%E9%A2%91%E8%AF%8D%E6%B1%87%E8%A1%A8.pdf",
  "https://dinenova.oss-cn-beijing.aliyuncs.com/ruankao/2026%E4%B8%8B%E5%8D%8A%E5%B9%B4%E7%B3%BB%E7%BB%9F%E6%9E%B6%E6%9E%84%E8%AE%BE%E8%AE%A1%E5%B8%88%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%E3%80%90%E5%AD%A6%E5%91%98%E7%89%88%E3%80%91.pdf",
  "https://dinenova.oss-cn-beijing.aliyuncs.com/ruankao/2026%E5%B9%B4%E4%B8%8B%E5%8D%8A%E5%B9%B4%E7%B3%BB%E7%BB%9F%E6%9E%B6%E6%9E%84%E8%AE%BE%E8%AE%A1%E5%B8%88%E4%B8%89%E8%89%B2%E7%AC%94%E8%AE%B0%E3%80%90%E5%AD%A6%E5%91%98%E7%89%88%E3%80%91.pdf",
  "https://dinenova.oss-cn-beijing.aliyuncs.com/ruankao/2026%E5%B9%B4%E4%B8%8B%E5%8D%8A%E5%B9%B4%E7%B3%BB%E7%BB%9F%E6%9E%B6%E6%9E%84%E8%AE%BE%E8%AE%A1%E5%B8%88%E6%98%93%E6%B7%B7%E6%B7%86%E7%9F%A5%E8%AF%86%E7%82%B9%E3%80%90%E5%AD%A6%E5%91%98%E7%89%88%E3%80%91.pdf",
  "https://dinenova.oss-cn-beijing.aliyuncs.com/ruankao/2026%E5%B9%B4%E4%B8%8B%E5%8D%8A%E5%B9%B4%E7%B3%BB%E7%BB%9F%E6%9E%B6%E6%9E%84%E8%AE%BE%E8%AE%A1%E5%B8%88%E6%9E%B6%E6%9E%84%E7%9F%A5%E8%AF%86%E7%82%B9%E9%9B%86%E9%94%A6%E7%B2%BE%E5%8D%8E%E7%89%88.pdf",
  "https://dinenova.oss-cn-beijing.aliyuncs.com/ruankao/2026%E5%B9%B4%E4%B8%8B%E5%8D%8A%E5%B9%B4%E7%B3%BB%E7%BB%9F%E6%9E%B6%E6%9E%84%E8%AE%BE%E8%AE%A1%E5%B8%88%E6%A0%B8%E5%BF%83%E5%AE%9D%E5%85%B8%E3%80%90%E5%AD%A6%E5%91%98%E7%89%88%E3%80%91.pdf",
  "https://dinenova.oss-cn-beijing.aliyuncs.com/ruankao/2026%E5%B9%B4%E4%B8%8B%E5%8D%8A%E5%B9%B4%E7%B3%BB%E7%BB%9F%E6%9E%B6%E6%9E%84%E8%AE%BE%E8%AE%A1%E5%B8%88%E6%A1%88%E4%BE%8B%E6%8F%90%E7%82%BC.pdf",
  "https://dinenova.oss-cn-beijing.aliyuncs.com/ruankao/2026%E5%B9%B4%E4%B8%8B%E5%8D%8A%E5%B9%B4%E7%B3%BB%E7%BB%9F%E6%9E%B6%E6%9E%84%E8%AE%BE%E8%AE%A1%E5%B8%88%E6%A1%88%E4%BE%8B%E6%A8%A1%E6%8B%9F%E9%A2%98%E5%90%88%E9%9B%86%E3%80%90%E5%AD%A6%E5%91%98%E7%89%88%E3%80%91.pdf",
  "https://dinenova.oss-cn-beijing.aliyuncs.com/ruankao/2026%E5%B9%B4%E4%B8%8B%E5%8D%8A%E5%B9%B4%E7%B3%BB%E7%BB%9F%E6%9E%B6%E6%9E%84%E8%AE%BE%E8%AE%A1%E5%B8%88%E7%BB%8F%E5%85%B8100%E9%A2%98%E3%80%90%E5%AD%A6%E5%91%98%E7%89%88%E3%80%91.pdf",
  "https://dinenova.oss-cn-beijing.aliyuncs.com/ruankao/2026%E5%B9%B4%E4%B8%8B%E5%8D%8A%E5%B9%B4%E7%B3%BB%E7%BB%9F%E6%9E%B6%E6%9E%84%E8%AE%BE%E8%AE%A1%E5%B8%88%E8%80%83%E7%82%B9%E8%87%AA%E6%9F%A5%E6%B8%85%E5%8D%95%E3%80%90%E5%AD%A6%E5%91%98%E7%89%88%E3%80%91.pdf",
  "https://dinenova.oss-cn-beijing.aliyuncs.com/ruankao/2026%E5%B9%B4%E4%B8%8B%E5%8D%8A%E5%B9%B4%E7%B3%BB%E7%BB%9F%E6%9E%B6%E6%9E%84%E8%AE%BE%E8%AE%A1%E5%B8%88%E8%AE%BA%E6%96%87%E6%8F%90%E7%82%BC.pdf",
  "https://dinenova.oss-cn-beijing.aliyuncs.com/ruankao/2026%E5%B9%B4%E4%B8%8B%E5%8D%8A%E5%B9%B4%E7%B3%BB%E7%BB%9F%E6%9E%B6%E6%9E%84%E8%AE%BE%E8%AE%A1%E5%B8%88%E8%AE%BA%E6%96%87%E8%8C%83%E6%96%87.pdf",
  "https://dinenova.oss-cn-beijing.aliyuncs.com/ruankao/2026%E5%B9%B4%E4%B8%8B%E5%8D%8A%E5%B9%B4%E7%B3%BB%E7%BB%9F%E6%9E%B6%E6%9E%84%E8%AE%BE%E8%AE%A1%E5%B8%88%E9%87%8D%E8%A6%81%E7%9F%A5%E8%AF%86%E7%82%B9100%E6%9D%A1%E3%80%90%E5%AD%A6%E5%91%98%E7%89%88%E3%80%91.pdf",
];

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function download(url) {
  const name = decodeURIComponent(url.split("/").pop());
  const dest = join(outDir, name);
  if (!force && (await exists(dest))) {
    console.log(`skip  ${name}`);
    return;
  }

  console.log(`get   ${name}`);
  const res = await fetch(url);
  if (!res.ok || !res.body) {
    throw new Error(`download failed ${res.status}: ${url}`);
  }

  await pipeline(res.body, createWriteStream(dest));
  console.log(`ok    ${name}`);
}

await mkdir(outDir, { recursive: true });
for (const url of files) {
  await download(url);
}
console.log(`synced ${files.length} pdfs -> ${outDir}`);
