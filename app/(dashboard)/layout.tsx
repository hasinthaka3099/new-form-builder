import Logo from '@/components/Logo';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { UserButton } from '@clerk/nextjs';
import React, { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'  // Make sure to import ThemeProvider

function Layout({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider attribute="class">
            
            <div className="flex flex-col h-full min-h-screen bg-background">
                <nav className="flex justify-between items-center border-b border-border h-[60px] px-4 py-2">
                    <Logo />
                    
                    <div className="flex gap-4 items-center">
                        <ThemeSwitcher />
                        <UserButton />
                    </div>
                </nav>
                
                <main className="flex w-full flex-grow">
                    {children}
                    
                </main>
            </div>
        </ThemeProvider>
    )
}

export default Layout;