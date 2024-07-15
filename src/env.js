import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z.string().url(),
    DATABASE_TKN: z.string(),

    DOCAI_BASEURL: z.string().url(),
    DOCAI_PROJECT_ID: z.string(),
    DOCAI_REGION: z.string(),
    DOCAI_COMPUTE: z.string(),
    DOCAI_VERSION: z.string(),
    DOCAI_CE: z.string().email(),
    DOCAI_ENDPOINT: z.string(),

    G_TKN_URL: z.string().url(),

    SA: z.string(),

    G_AT: z.string(),

    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_TKN: process.env.DATABASE_URL,

    DOCAI_BASEURL: process.env.DOCAI_BASEURL,
    DOCAI_PROJECT_ID: process.env.DOCAI_PROJECT_ID,
    DOCAI_REGION: process.env.DOCAI_REGION,
    DOCAI_COMPUTE: process.env.DOCAI_COMPUTE,
    DOCAI_VERSION: process.env.DOCAI_VERSION,
    DOCAI_ENDPOINT: process.env.DOCAI_ENDPOINT,
    DOCAI_CE: process.env.DOCAI_CE,

    G_TKN_URL: process.env.G_TKN_URL,

    SA: process.env.SA,

    G_AT: process.env.G_AT,

    NODE_ENV: process.env.NODE_ENV,
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
