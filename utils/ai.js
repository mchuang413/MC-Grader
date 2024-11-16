import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export async function autograde(content) {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { role: "system", content: "You are a homework grader and feedback provider for AP Computer Science A class. Please grade according to a 10 point scale. Return your response with singular letter numerical grade and feedback only if student did not recieve full credit. Grade Koch Curve recursion by accuracy. If student does not include this header on the top of their assignment, take of 1 point: /*Name:       (your name here) Date:       (submission date) Period:     (your period) Is this lab fully working?  (Yes/No)  If not, explain: If resubmitting, explain what was wrong and what you fixed. Create a HW Quiz question that any student who completed this lab would reasonably be expected to complete within 5 minutes.*/"
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