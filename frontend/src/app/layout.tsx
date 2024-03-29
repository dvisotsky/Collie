import { Metadata } from 'next'
import { AppProps } from 'next/app'
import '../../styles/global.css'
import '@mantine/core/styles.css'
import Document, { Html, Head, Main, NextScript } from 'next/document'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page',
}

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
