import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"
export const POST = async (req) => {
    const {prompt, tag, userId} = await req.json()

    try{
        await connectToDB()

        //Method 1:
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })
        await newPrompt.save()

        //Method 2:

        // const newPrompt = await Prompt.create({
        //     creator: userId,
        //     prompt,
        //     tag
        // })

        return new Response(JSON.stringify(newPrompt),{status: 201})
    }catch(error){
        return new Response('Failed to create a new prompt', {status: 500})
    }
}