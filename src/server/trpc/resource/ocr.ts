import { z } from "zod";

export const SupportedFiles = z.union([
  z.literal("PDF"),
  z.literal("GIF"),
  z.literal("TIFF"),
  z.literal("JPEG"),
  z.literal("PNG"),
  z.literal("BMP"),
  z.literal("WEBP"),
]);
export const MimeType = z.union([
  z.literal("application/pdf"),
  z.literal("application/gif"),
  z.literal("application/tiff"),
  z.literal("application/jpeg"),
  z.literal("application/png"),
  z.literal("application/bmp"),
  z.literal("application/webp"),
]);

export type MimeTypeSchema = z.infer<typeof MimeType>;

export const RawDocumentResource = z.object({
  mimeType: MimeType,
  content: z.string(),
});

export type RawDocumentSchema = z.infer<typeof RawDocumentResource>;

export const ProcRequestResource = z.object({
  // name: z.string(),
  skipHumanReview: z.boolean().or(z.undefined()),
  rawDocument: RawDocumentResource,
});

export type ProcRequestSchema = z.infer<typeof ProcRequestResource>;

export const ClientProcRequestSchema = z.object({
  name: z.string(),
  rawDocument: RawDocumentResource,
});

export type ClientProcRequest = z.infer<typeof ClientProcRequestSchema>;
