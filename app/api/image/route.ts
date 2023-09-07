import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openAi = new OpenAIApi(configuration)

const instructionMessage: ChatCompletionRequestMessage = {
    role: "system",
    content: "You are an image generator. You must answer only in markdown code snippets. Use  code comments for explaination"
}

export async function POST(
    req: Request
){
    try {

        const { userId } = auth();
        const body = await req.json()
        const { prompt, amount=1, resolution="512x512" } = body
        if(!userId){
            return new NextResponse("Unauthorized",{ status: 401})
        }

        if(!configuration.apiKey){
            return new NextResponse("Open Api key is absent", {status: 500})
        }

        if(!prompt){
            return new NextResponse("Prmopt is required", {status: 400})
        }

        if(!amount){
            return new NextResponse("Amount is required", {status: 400})
        }

        if(!resolution){
            return new NextResponse("Resolution is required", {status: 400})
        }

        const response = await openAi.createImage({
            prompt,
            n: parseInt(amount,10),
            size: resolution
        });

        return NextResponse.json(response.data.data);
        
    } catch (error) {
        console.log("[IMAGE_ERROR]",error);
        return new NextResponse("Internal Server",{status: 500})
    }
}
