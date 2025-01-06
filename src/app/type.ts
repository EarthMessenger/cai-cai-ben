import { z } from "zod";

export const UserSchema = z.object({
  uid: z.number().int().nonnegative(),
  name: z.string(),
  avatar: z.string().url(),
  color: z.string(),
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

