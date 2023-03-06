import { Configuration, OpenAIApi } from "openai";
import { env } from "./env";
import { PROMPTS, EXPLANATION } from "./costants";

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
    // suffix:
    //   "# List of prompts and equivalent cron expression\n#  in the following format: [minutes hours day-of-the-month month weekday]\n# week repetition is expressed in days-of-the-month\n# time is 24h format\n# a cron expression cannot contain an empty value\n\n\nPrompt: At 00:05 in August\nCron: 5 0 * 8 *\n\nPrompt: At 14:15 on day-of-month 1.\nCron: 15 14 1 * *\n\nPrompt: At 14 on Friday\nCron: 0 14 * * 5\n\nPrompt: At 22:00 on every day-of-week from Monday through Friday\nCron: 0 22 * * 1-5\n\nPrompt: At every 30th minute past hour 22 on Monday\nCron: */30 22 * * 1\n\nPrompt: At 3pm every 2 weeks in april\nCron: * 15 */14 4 *\n\nPrompt: At 3pm every 2 weeks in april\nCron: * 15 */14 4 *\n\nPrompt: every 12 weeks on monday\nCron: * * */84 1 *\n\nPrompt: every 2 weeks on monday\nCron: * * */14 1 *\n\nPrompt: Every friday at 3pm\nCron: 0 15 * * 5\n\nPrompt: on 25th from jan to nov\nCron: * * 25 1-11 *\n\n",
    temperature: 1,
    max_tokens: 480,
    top_p: 1,
    best_of: 2,
    frequency_penalty: 0,
    presence_penalty: 0.21,
  });
}
