"use client"

import axios from "axios";
import * as z from "zod";
import Heading from '@/components/heading'
import { ImageIcon } from 'lucide-react'
import React,{ useState } from 'react'
import { useForm } from 'react-hook-form'
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { ChatCompletionRequestMessage } from "openai";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";

const ImagePage = () => {

  const router = useRouter();
  const [message, setMessage] = useState<ChatCompletionRequestMessage[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
      defaultValues:{
          prompt: ""
      }
  })

  const isLoading = form.formState.isLoading;

  const onSubmit = async(values: z.infer<typeof formSchema>) => {
      try {
        const userMessage: ChatCompletionRequestMessage = {
          role: "user",
          content: values.prompt
        }
        const newMessages = [...message, userMessage]
        const response = await axios.post("/api/image", {
          message: newMessages
        });

        setMessage((current)=>[...current, userMessage, response.data])
        form.reset();
      } catch (error: any) {
        console.log(error);
      }finally{
        router.refresh();
      }
  }
  return (
    <div>
        <Heading
        title= "Image Generation"
        description= "Turn your prompt into an Image"
        icon= {ImageIcon}
        iconColor='text-violet-500'
        bgColor='bg-violet-500/10'
        />
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
              <FormField name="prompt"
               render={({ field })=>(
                <FormItem className="col-span-12 lg:col-span-10 ">
                  <FormControl className="m-0 p-0 ">
                    <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent" 
                    disabled={isLoading}
                    placeholder="How do I calculate the radius of a circle?"
                    {...field}
                    />
                  </FormControl>
                </FormItem>
               )}
              />
              <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading} size="icon">
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center">
              <Loader/>
            </div>
          )}

          {message.length === 0 && !isLoading && (
            <div>
              <Empty label="No Conversation Started."/>
            </div>
          )}
            <div className="flex flex-col-reverse gap-y-4">
                {message.map((msg)=>(
                  <div key={msg.content}
                    className={cn(
                      "p-8 w-full flex items-start gap-x-8 rounded-lg",
                      msg.role === "user"?"bg-white border border-black/10":"bg-muted"
                    )}
                  >
                    {msg.role === "user"? <UserAvatar/>: <BotAvatar/>}
                    <p className="text-sm">
                      {msg.content}
                    </p>                    
                  </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default ImagePage