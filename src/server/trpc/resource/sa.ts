import { z } from "zod";

export const SA = z.object({
  type: z.string(),
  project_id: z.string(),
  private_key_id: z.string(),
  private_key: z.string(),
  client_email: z.string().email(),
  client_id: z.string(),
  auth_uri: z.string().url(),
  token_uri: z.string().url(),
  auth_provider_x509_cert_url: z.string().url(),
  client_x509_cert_url: z.string().url(),
  universe_domain: z.string(),
});

export type ServiceAccount = z.infer<typeof SA>;

export const TokenResource = z.object({
  access_token: z.string(),
  expires_in: z.number(),
  token_type: z.string(),
  scope: z.string().or(z.undefined()),
  refresh_token: z.string().or(z.undefined()),
  id_token: z.string().or(z.undefined()),
});

export type TokenResponse = z.infer<typeof TokenResource>;
