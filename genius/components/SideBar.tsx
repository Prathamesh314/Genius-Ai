"use client";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { Montserrat } from 'next/font/google';
import { cn } from '@/lib/utils';
import { LayoutDashboard } from 'lucide-react';

const montserrat = Montserrat({weight: "600"
, subsets:["latin"]
})

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500"
    }
]

const SideBar = () => {
  return (
    <div className='space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white'>
        <div className='px-3 py-2 flex-1'>
            <Link href="/dashboard" className='flex items-center pl-3 mb-14'>
                <div className='relative h-8 w-8 mr-4'>
                    <Image fill src="/logo.png" alt="logo"/>
                </div>
                <h1 className={cn('text-2xl font-bold', montserrat.className)}>Genius</h1>
            </Link>
            <div>
                {routes.map((route)=>(
                    <Link href={route.href} key={route.href}>
                        <div className='flex items-center flex-1'>
                            <route.icon className={cn("h-5 w-5 mr-3", route.color)}/>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    </div>
  )
}

export default SideBar