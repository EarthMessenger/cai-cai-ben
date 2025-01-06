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
