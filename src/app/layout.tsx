import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "猜猜犇",
  description: "根据洛谷犇犇猜测作者名字颜色",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-hans">
      <body>{children}</body>
    </html>
  )
}
