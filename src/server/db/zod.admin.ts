import { z } from "zod";

export const AdminResourceSchema = z.object({
  userId: z.string(),
  displayName: z.string().nullable(),
  email: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  photoURL: z.string().nullable(),
  active: z.boolean().optional().default(true),
  verified: z.boolean().optional().default(false),
  createdAt: z.string().date(),
  createdBy: z.string(),
  updatedAt: z.number(),
});
export type AdminResource = z.infer<typeof AdminResourceSchema>;

export const InsertAdminSchema = z.object({
  userId: z.string(),
  displayName: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  photoURL: z.string().nullable().optional(),
  active: z.boolean().nullable().optional(),
  master: z.boolean().optional(),
  createdBy: z.string(),
  verified: z.boolean().nullable().optional(),
});
export type InsertAdmin = z.infer<typeof InsertAdminSchema>;

export const GetAdminSchema = z.object({
  userId: z.string(),
});
export type GetAdmin = z.infer<typeof GetAdminSchema>;

export const DeleteAdminSchema = z.object({
  userId: z.string(),
});
export type DeleteAdmin = z.infer<typeof DeleteAdminSchema>;

export const UpdateAdminSchema = z.object({
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
export type UpdateAdmin = z.infer<typeof UpdateAdminSchema>;
