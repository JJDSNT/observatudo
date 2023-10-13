import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { getServerSession } from "next-auth";
import SessionProvider from "@/app/components/SessionProvider";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: 'ObservaTudo',
  description: 'Dashboard de indicadores cívicos',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#041E42',
  twitter: {
    card: "summary",
    title: "ObservaTudo",
    description: "Dashboard de indicadores cívicos",
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession();

  return (
    <html lang="pt-br">
      <head />
      <body className={inter.className}>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
