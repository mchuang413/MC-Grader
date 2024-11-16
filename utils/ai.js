import OpenAI from 'openai';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const openai = new OpenAI(process.env.OPENAI_API_KEY);

const __dirname = import.meta.dirname;

function readFile(path) {
    return fs.readFileSync(path, 'utf-8');
}

export async function autograde(content, lab) {
    const systemPrompt = readFile(path.join(__dirname, 'system-prompt.txt'));
    const labInfo = readFile(path.join(__dirname, '..', 'labs', `${lab}.txt`));

    const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            { role: 'system', content: systemPrompt},
            { role: 'system', content: `Lab instructions:\n${labInfo}` },
            {
                role: 'user',
                content: content,
            }
        ]
    });
    const message = completion.choices[0].message.content;
    console.log(completion.choices[0].message.content);

    //Parse data
    const lines = message.split('\n'); //array of lines
    const score = parseFloat(lines[0]); //I hope this is consistent
    let comments = "";
    for (let i = 1; i < lines.length; i++) {
        comments += '\n';
        comments += lines[i];
    }
    return {score, comments};
}