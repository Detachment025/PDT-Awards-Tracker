import { Html, Head, Main, NextScript } from 'next/document'
import { DataProvider, DataContext } from '@/utils/data';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="h-screen">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
