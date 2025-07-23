import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { StoreProvider } from './StoreProvider'

const inter = Inter({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'GSE',
  description: "Gregory's School Education",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body
          className={inter.className}
          style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
          suppressHydrationWarning
        >
          <Header />
          <main className="flex flex-col flex-grow items-center justify-between pt-24 px-8">{children}</main>
          <Footer />
        </body>
      </html>
    </StoreProvider>
  )
}
