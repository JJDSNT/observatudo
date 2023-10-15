import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { getServerSession } from "next-auth";
import SessionProvider from "@/app/components/SessionProvider";

const inter = Inter({ subsets: ['latin'] })

const APP_NAME = "Observa Tudo";
const APP_DEFAULT_TITLE = "ObservaTudo";
const APP_TITLE_TEMPLATE = "%s - ObservaTudo";
const APP_DESCRIPTION = "Dashboard de indicadores cívicos";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  themeColor: "#041E42",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  twitter: {
    card: "summary",
    title: APP_DEFAULT_TITLE,
    description: APP_DESCRIPTION,
    images: "https://www.observatudo.com.br/android-chrome-512x512.png"
  },
  openGraph: {
    type: "website",
    url: "https://observatudo.com.br/",
    title: APP_DEFAULT_TITLE,
    description: APP_DESCRIPTION,
    siteName: APP_NAME,
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
