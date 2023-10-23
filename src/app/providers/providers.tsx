'use client';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { SessionProvider } from "next-auth/react";

export default function Providers({ children, session }: { children: React.ReactNode, session: any }) {
    return (
        <SessionProvider session={session}>
            <NextUIProvider>
                <NextThemesProvider
                    attribute='class'
                    defaultTheme='system'
                    enableSystem
                >
                    {children}
                </NextThemesProvider>
            </NextUIProvider>
        </SessionProvider>
    );
}
