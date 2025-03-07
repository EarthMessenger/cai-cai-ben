import { z } from "zod";
import { luoguColors } from "@/luogu";

export const UserSchema = z.object({
  uid: z.number().int().nonnegative(),
  name: z.string(),
  avatar: z.string().url(),
  color: z.enum(luoguColors),
});

export const BenbenSchema = z.object({
  content: z.string(),
  id: z.number().int().nonnegative(),
  time: z.number().int(),
  user: UserSchema,
});

export const LuoguBenbenApiSchema = z.object({
  feeds: z.object({
    result: z.array(BenbenSchema),
  }),
});

export type BenbenWithCompiledContent = z.infer<typeof BenbenSchema> & {compiledContent: string};
