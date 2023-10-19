'use client'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
//para colocar o auth provider aqui teria que adicionar a props session
export default function Providers({ children }: { children: React.ReactNode }) {
    return (
            <NextUIProvider>
                <NextThemesProvider
                    attribute='class'
                    defaultTheme='system'
                    enableSystem
                >
                    {children}
                </NextThemesProvider>
            </NextUIProvider>
    )
}