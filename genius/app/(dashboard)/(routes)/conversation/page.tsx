import Heading from '@/components/heading'
import { LucideIcon, MessageSquare } from 'lucide-react'
import React from 'react'



const ConversationPage = () => {
  return (
    <div>
        <Heading
        title= "Conversation"
        description= "This is the most advanced AI bot for conversation"
        icon= {MessageSquare}
        iconColor='text-violet-500'
        bgColor='bg-violet-500/10'
        />
    </div>
  )
}

export default ConversationPage