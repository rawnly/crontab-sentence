import { z } from "zod";

export const Payload = z.object({
  prompt: z.string(),
});

export type Payload = z.infer<typeof Payload>;

export const Response = z.object({
  expression: z.string(),
});

export type Response = z.infer<typeof Response>;
