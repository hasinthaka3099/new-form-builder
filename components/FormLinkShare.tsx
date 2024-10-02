"use client";

import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from '@/hooks/use-toast';
import { MdShare } from "react-icons/md";


function FormLinkShare( {shareUrl} : {shareUrl: string} ) {

    const [mounted, setMounted] = useState(false);

    useEffect(()=> {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const shareLink = `${window.location.origin}/submit/${shareUrl}`;

  return (
    <div className="flex flex-grow gap-4 items-center">
        <Input value={shareLink} readOnly/>
        <Button className='w-[230px]' onClick={() =>{
            navigator.clipboard.writeText(shareLink);
            toast({
                title: "Copied",
                description: "Link Copied"
            });
        }}>
            <MdShare />

        </Button>
        
    </div>
  )
}

export default FormLinkShare;