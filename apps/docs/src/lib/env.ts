import { z } from "zod";

const Env = z.object({
  OPENAI_API_KEY: z.string(),
});

export const env = Env.parse(process.env);
