import OpenAI from "openai";
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const openai = new OpenAI(process.env.OPENAI_API_KEY);

const __dirname = import.meta.dirname;
function readFile(path) {
    return fs.readFileSync(path, 'utf-8');
}

export async function autograde(content) {
    const systemPrompt = readFile(path.join(__dirname, 'system-prompt.txt'));
    
    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { role: "system", content: systemPrompt
            },
            {
                role: "user",
                content: content,
            }
        ]
    });
    const message = completion.choices[0].message.content;
    console.log(completion.choices[0].message.content);
    return message;
}