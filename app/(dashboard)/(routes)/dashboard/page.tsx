"use client"

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ArrowRight, Code, ImageIcon, MessageSquare, Music, Video } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const Dashboard = () => {

  const router = useRouter();

  const tools = [
    {
      label: "Conversation",
      icon: MessageSquare,
      color: "text-violet-500",
      bg: "bg-violet-500/10",
      href: "/conversation"
    },
    {
      label: "Music Generation",
      icon: Music,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      href: "/music"
    },
    {
      label: "Image Generation",
      icon: ImageIcon,
      color: "text-pink-500",
      bg: "bg-pink-500/10",
      href: "/image"
    },
    {
      label: "Video Generation",
      icon: Video,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      href: "/video"
    },
    {
      label: "Code Generation",
      icon: Code,
      color: "text-green-500",
      bg: "bg-green-500/10",
      href: "/code"
    },
  ]
  return (
    <div>
        <div className='mb-8 space-y-4'>
          <h2 className='text-2xl md:text-4xl font-bold text-center'>
            Explore the power of AI
          </h2>
          <p className='text-muted-foreground text-center font-light text-sm md:text-lg'>
            Chat with the Experienced AI - Experience the power of AI
          </p>
        </div>
        <div className='px-4 md:px-20 lg:px-32 space-y-4'>
          {tools.map((tool)=>(
            <Card onClick={()=>router.push(tool.href)} key={tool.href} className='p-4 border-black/5 items-center flex justify-between hover:shadow-md transition cursor-pointer'>
                <div className='flex items-center gap-x-4'>
                  <div className={cn('p-2 w-fit rounded-md',tool.bg)}>
                    <tool.icon className={cn("w-8 h-8",tool.color)}/>
                  </div>
                  <div className='font-semibold'>
                    {tool.label}
                  </div>
                </div>
                <ArrowRight/>
            </Card>
          ))}
        </div>
    </div>
  )
}

export default Dashboard
