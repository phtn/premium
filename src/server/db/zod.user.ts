import { z } from "zod";

export const UserResourceSchema = z.object({
  userId: z.string(),
  displayName: z.string().nullable(),
  email: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  photoURL: z.string().nullable(),
  active: z.boolean().optional().default(true),
  verified: z.boolean().optional().default(false),
  createdAt: z.string().date(),
  updatedAt: z.number(),
});
export type UserResource = z.infer<typeof UserResourceSchema>;

export const InsertUserSchema = z.object({
  userId: z.string(),
  displayName: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  photoURL: z.string().optional().nullable(),
  active: z.boolean().default(true),
  verified: z.boolean().optional().default(false),
});
export type InsertUser = z.infer<typeof InsertUserSchema>;

export const GetUserSchema = z.object({
  userId: z.string(),
});
export type GetUser = z.infer<typeof GetUserSchema>;

export const DeleteUserSchema = z.object({
  userId: z.string(),
});
export type DeleteUser = z.infer<typeof DeleteUserSchema>;

export const UpdateUserSchema = z.object({
  userId: z.string(),
  values: z.object({
    displayName: z.string().optional(),
    email: z.string().optional(),
    phoneNumber: z.string().optional(),
    photoURL: z.string().optional(),
    active: z.boolean().optional(),
    verified: z.boolean().optional(),
  }),
});
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
