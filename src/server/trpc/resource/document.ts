import { z } from "zod";

export const TextAnchorSchema = z.object({
  textSegments: z.array(
    z.object({
      startIndex: z.string().or(z.number()).or(z.undefined()),
      endIndex: z.string().or(z.number()).or(z.undefined()),
    }),
  ),
  content: z.string().or(z.null()).or(z.undefined()),
});
export type TextAnchor = z.infer<typeof TextAnchorSchema>;

export const OCRField = z.object({
  fieldName: z.string().or(z.undefined()),
  fieldValue: z.string().or(z.undefined()),
});

export type OCRFieldSchema = z.infer<typeof OCRField>;

const Vertex = z.object({
  x: z.number(),
  y: z.number(),
});

const BoundingBox = z.object({
  vertices: z.array(Vertex),
});

const Layout = z.object({
  boundingBox: BoundingBox,
  confidence: z.number(),
});

const DetectedLanguage = z.object({
  languageCode: z.string(),
});

const Token = z.object({
  layout: Layout,
  detectedLanguages: z.array(DetectedLanguage),
  text: z.string(),
});

const Line = z.object({
  layout: Layout,
  text: z.string(),
});

const Paragraph = z.object({
  layout: Layout,
  text: z.string(),
});

const Block = z.object({
  layout: Layout,
  text: z.string(),
});

const Page = z.object({
  pageNumber: z.number(),
  dimension: z.object({
    width: z.number(),
    height: z.number(),
    unit: z.string(),
  }),
  blocks: z.array(Block),
  paragraphs: z.array(Paragraph),
  lines: z.array(Line),
  tokens: z.array(Token),
});

const Entity = z.object({
  type: z.string(),
  mentionText: z.string(),
  confidence: z.number(),
  textAnchor: TextAnchorSchema,
  pageAnchor: z.object({
    pageRefs: z.array(
      z.object({
        page: z.string(),
        boundingPoly: BoundingBox,
      }),
    ),
  }),
});

const DocumentAIResponseSchema = z.object({
  document: z.object({
    text: z.string(),
    pages: z.array(Page),
    entities: z.array(Entity),
  }),
});

// Infer the type from the schema
export type DocumentAIResponse = z.infer<typeof DocumentAIResponseSchema>;
