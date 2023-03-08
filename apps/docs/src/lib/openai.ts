import { Configuration, OpenAIApi } from "openai";
import { env } from "./env";
import { PROMPTS, EXPLANATION, MESSAGES } from "./costants";

const config = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});

export const openai = new OpenAIApi(config);

const SUFFIX = `${EXPLANATION.join("\n")}\n\n${PROMPTS.map(
  (p) => `PROMPT: ${p.prompt}\nCRON: ${p.cron}`
).join("\n")}`;

export function askOpenAI(query: string) {
  return openai.createCompletion({
    model: "text-davinci-003",
    prompt: `PROMPT: ${query}\nCRON: `,
    suffix: SUFFIX,
    temperature: 1,
    max_tokens: 480,
    top_p: 1,
    best_of: 2,
    frequency_penalty: 0,
    presence_penalty: 0.21,
  });
}

export const askChatAI = (prompt: string) =>
  openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [...MESSAGES, { role: "user", content: prompt }],
    temperature: 0.5,
    frequency_penalty: 0,
    presence_penalty: 0.21,
    top_p: 1,
    max_tokens: 480,
  });
