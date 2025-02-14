// import OpenAI from 'openai';
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

//const openai = new OpenAI(process.env.OPENAI_API_KEY);

const __dirname = import.meta.dirname;

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

function readFile(path) {
  return fs.readFileSync(path, "utf-8");
}

export async function autograde(content, lab) {
  const systemPrompt = readFile(path.join(__dirname, "system-prompt.txt"));
  const labInfo = readFile(path.join(__dirname, "..", "labs", `${lab}.txt`));

  const chatSession = model.startChat({
    history: [
      {
        role: "user",
        parts: [
          {
            text: `${systemPrompt}\n\n-- START OF LAB INSTRUCTIONS: --\n${labInfo}\n-- END OF LAB INSTRUCTIONS: --`,
          },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(
    `-- START OF STUDENT CODE --\n${content}\n-- END OF STUDENT CODE --`,
  );

  const message = result.response.text();
  //console.log(labInfo);

  //const completion = await openai.chat.completions.create({
  //   model: "gpt-4o-mini",
  //   messages: [
  //     { role: "system", content: systemPrompt },
  //     {
  //       role: "system",
  //       content: `-- START OF LAB INSTRUCTIONS: --\n${labInfo}\n-- END OF LAB INSTRUCTIONS: --`,
  //     },
  //     {
  //       role: "user",
  //       content: `-- START OF STUDENT CODE --\n${content}\n-- END OF STUDENT CODE --`,
  //     },
  //   ],
  // });
  // const message = completion.choices[0].message.content;
  // console.log(completion.choices[0].message.content);

  //Parse data
  const lines = message.split("\n"); //array of lines
  const score = parseFloat(lines[0]) || 0; //TODO: add input filtering
  let comments = "";
  for (let i = 1; i < lines.length; i++) {
    if (i != 1) comments += "\n";
    comments += lines[i];
  }
  return { score, comments };
}
