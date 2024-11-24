import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { HfInference } from '@huggingface/inference'

dotenv.config();

// const openai = new OpenAI(process.env.OPENAI_API_KEY);

const __dirname = import.meta.dirname;

function readFile(path) {
    return fs.readFileSync(path, 'utf-8');
}

const inference = new HfInference("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");



// meta-llama/Meta-Llama-3-8B-Instruct

// export default async function test() {
//     const result = await inference.request({
//         model : 'meta-llama/Meta-Llama-3-8B-Instruct',
//         inputs : 'how are you doing',
//         parameters: { max_new_tokens: 1000 },
//     })

//     console.log(result);
// }


 export default async function autograde(content, lab) {
    const systemPrompt = readFile(path.join(__dirname, 'system-prompt.txt'));
    const labInfo = readFile(path.join(__dirname, '..', 'labs', `${lab}.txt`));
    if (!labInfo) return null;

    console.log(labInfo);

    const completion = await inference.request({
        model: 'meta-llama/Llama-3.2-3B-Instruct',
        inputs: `${systemPrompt} -- START OF LAB INSTRUCTIONS: --\n${labInfo}\n-- END OF LAB INSTRUCTIONS: -- -- START OF STUDENT CODE --\n${content}\n-- END OF STUDENT CODE --`,
        parameters: { max_new_tokens: 1000 },
    });
    console.log(completion);

//     //Parse data
//     const lines = message.split('\n'); //array of lines
//     const score = parseFloat(lines[0]) || -1;
//     let comments = "";
//     for (let i = 1; i < lines.length; i++) {
//         if(i != 1) comments += '\n';
//         comments += lines[i];
//     }
//     if(score === -1) comments += "\nUnexpected AI formatting issue";
//     return {score, comments};
 }