import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),

    TURSO_DATABASE_URL: z.string(),
    TURSO_AUTH_TOKEN: z.string(),

    PM_PB_TEST_KEY: z.string(),
    PM_SC_TEST_KEY: z.string(),

    G_WEB_CLIENT_ID: z.string(),
    G_CLIENT_SECRET: z.string(),

    F_ADMIN: z.string(),

    UPSTASH_VECTOR_REST_URL: z.string().url(),
    UPSTASH_VECTOR_REST_TOKEN: z.string(),
    UPSTASH_REDIS_REST_URL: z.string(),
    UPSTASH_REDIS_REST_TOKEN: z.string(),
    UPSTASH_EMAIL: z.string().email(),
    UPSTASH_API_K: z.string(),
    QSTASH_TOKEN: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_F_API_KEY: z.string(),
    NEXT_PUBLIC_F_PROJECT_ID: z.string(),
    NEXT_PUBLIC_F_STORAGE: z.string(),
    NEXT_PUBLIC_F_MESSAGING_ID: z.string(),
    NEXT_PUBLIC_F_APP_ID: z.string(),
    NEXT_PUBLIC_F_MEASUREMENT: z.string(),
    NEXT_PUBLIC_F_AUTH_DOMAIN: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,

    TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL,
    TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,

    PM_PB_TEST_KEY: process.env.PM_PB_TEST_KEY,
    PM_SC_TEST_KEY: process.env.PM_SC_TEST_KEY,

    G_WEB_CLIENT_ID: process.env.G_WEB_CLIENT_ID,
    G_CLIENT_SECRET: process.env.G_CLIENT_SECRET,

    UPSTASH_VECTOR_REST_URL: process.env.UPSTASH_VECTOR_REST_URL,
    UPSTASH_VECTOR_REST_TOKEN: process.env.UPSTASH_VECTOR_REST_TOKEN,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    UPSTASH_EMAIL: process.env.UPSTASH_EMAIL,
    UPSTASH_API_K: process.env.UPSTASH_API_K,
    QSTASH_TOKEN: process.env.QSTASH_TOKEN,

    NEXT_PUBLIC_F_API_KEY: process.env.NEXT_PUBLIC_F_API_KEY,
    NEXT_PUBLIC_F_AUTH_DOMAIN: process.env.NEXT_PUBLIC_F_AUTH_DOMAIN,
    NEXT_PUBLIC_F_PROJECT_ID: process.env.NEXT_PUBLIC_F_PROJECT_ID,
    NEXT_PUBLIC_F_STORAGE: process.env.NEXT_PUBLIC_F_STORAGE,
    NEXT_PUBLIC_F_MESSAGING_ID: process.env.NEXT_PUBLIC_F_MESSAGING_ID,
    NEXT_PUBLIC_F_APP_ID: process.env.NEXT_PUBLIC_F_APP_ID,
    NEXT_PUBLIC_F_MEASUREMENT: process.env.NEXT_PUBLIC_F_MEASUREMENT,
    F_ADMIN: process.env.F_ADMIN,
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
