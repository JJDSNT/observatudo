import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ObservaTudo',
  description: 'Dashboard de indicadores cívicos',
  themeColor: '#041E42',
  twitter: {
    card: "summary",
    title:"ObservaTudo",
    description:"Dashboard de indicadores cívicos",
    images: "https://www.observatudo.com.br/android-chrome-512x512.png"
  },
  openGraph: {
    type: "website",
    url: "https://observatudo.com.br/",
    title: "ObservaTudo",
    description: "Dashboard de indicadores cívicos",
    siteName: "Observa Tudo",
    images: [{
      url: "https://www.observatudo.com.br/android-chrome-512x512.png",
    }],
  }

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <head />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
