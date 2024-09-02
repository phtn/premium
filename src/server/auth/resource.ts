import { z } from "zod";

export const SignInWithPhoneParamsSchema = z.object({
  phoneNumber: z.string(),
});
export type SignInWithPhoneParams = z.infer<typeof SignInWithPhoneParamsSchema>;
