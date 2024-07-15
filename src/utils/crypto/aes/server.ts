import crypto from "crypto";

export const encrypt = async (text: string, key: string) => {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", Buffer.from(key), iv);
  const encrypted = Buffer.concat([
    cipher.update(new TextEncoder().encode(text)),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  return { encrypted, iv, authTag };
};
