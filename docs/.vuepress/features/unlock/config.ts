import { PREVIEW_HEIGHT } from "./heights";

const withDefaultHeight = (
  paths: readonly string[],
  height: string = PREVIEW_HEIGHT.XL,
): Record<string, string> =>
  Object.fromEntries(paths.map((path) => [path, height]));

export const unlockConfig = {
  // 版本号变更可强制用户重新验证
  unlockVersion: "v1",
  // 调试用：设为 true 时无视本地已解锁状态，始终触发限制
  forceLock: false,
  code: "888666",
  // 公众号二维码（架构师姜小白）
  qrCodeUrl: "/wechat-qrcode.jpg",
  accountName: "架构师姜小白",
  // 路径 -> 可见高度（建议使用 PREVIEW_HEIGHT 预设）
  protectedPaths: {},
  // 目录前缀 -> 可见高度（该目录下所有文章都触发验证）
  protectedPrefixes: {
    ...withDefaultHeight(
      [
        "/java",
        "/database",
        "/cs-basics",
        "/distributed-system",
        "/system-design",
        "/high-performance",
        "/high-availability",
        "/interview-preparation",
        "/ai",
        "/ai-coding",
        "/tools",
      ],
      PREVIEW_HEIGHT.LONG,
    ),
  },
} as const;

export { PREVIEW_HEIGHT };
