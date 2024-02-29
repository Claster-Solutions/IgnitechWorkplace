import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'
import Navbar from './components/Navbar'

export const metadata: Metadata = {
  title: 'Ignitech',
  description: 'Workplace for ignitech production management',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cz">
      <Script src="dist/notiflix-aio-3.2.7.min.js"></Script>
      <body className="montserrat">
        <Navbar />
        <div className="p-4">{children}</div>
      </body>
    </html>
  )
}
