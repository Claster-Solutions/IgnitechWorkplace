import type { Metadata } from 'next'
import './globals.css'
import Navbar from './components/NavBar'

export const metadata: Metadata = {
  title: 'Ignitech',
  description: 'Workplace for ignitech production management',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cz">
      <body className="montserrat">
        <Navbar />
        <div className="p-4">{children}</div>
      </body>
    </html>
  )
}
