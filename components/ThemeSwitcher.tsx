"use client";


import { DesktopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

function ThemeSwitcher() {

    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(()=> {
        setMounted(true);
    }, []);

    if (!mounted) return null; 

    return (
        <Tabs defaultValue={theme}>
            <TabsList>
                <TabsTrigger value='light' onClick={()=> setTheme("light")} 
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md 
                text-sm font-medium transition-colors focus-visible:outline-none 
                focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none 
                disabled:opacity-50 hover:bg-accent hover:text-accent-foreground py-2 h-8 w-8 px-0 
                data-[state=active]:bg-gray-700 dark:data-[state=active]:bg-gray-700">
                    <SunIcon className="h-[1.2rem] w-[1.2rem]"/>
                    
                </TabsTrigger>
                <TabsTrigger value='dark' onClick={()=> setTheme("dark")} 
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm 
                font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
                disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground py-2 h-8 w-8 px-0
                data-[state=active]:bg-gray-700 dark:data-[state=active]:bg-gray-700">
                    <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:rotate-0"/>
                    
                </TabsTrigger>
                <TabsTrigger value='system' onClick={()=> setTheme("system")} className="inline-flex items-center 
                justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none 
                focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent 
                hover:text-accent-foreground py-2 h-8 w-8 px-0
                data-[state=active]:bg-gray-700 dark:data-[state=active]:bg-gray-700">
                    <DesktopIcon className="h-[1.2rem] w-[1.2rem]"/>
                    
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}

export default ThemeSwitcher;   