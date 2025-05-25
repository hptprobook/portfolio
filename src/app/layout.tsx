'use client';
import './globals.css';

import { ThemeProvider } from '@/context/ThemeContext';
import { Outfit } from 'next/font/google';
import React from 'react';

const outfit = Outfit({
    subsets: ['latin'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${outfit.className} dark:bg-gray-900`}>
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
}
