export const genCryptoKey = async () =>
  await crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"],
  );

export const encrypt_client = async (tx: string, key: CryptoKey) => {
  // initialization vector
  const ivl = 12;
  const iv = crypto.getRandomValues(new Uint8Array(ivl));
  const data = new TextEncoder().encode(tx);
  const encrypted = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    data,
  );

  const encryption = new Uint8Array(iv.length + encrypted.byteLength);
  encryption.set(iv);
  encryption.set(new Uint8Array(encrypted), iv.length);
  const buffer = encryption.buffer;
  const encoded = en64(buffer as ArrayBuffer);

  return { buffer, encoded };
};

export const decrypt_client = async (
  encryption: ArrayBuffer | string,
  key: CryptoKey,
) => {
  const ivl = 12;
  const encrypted =
    encryption === "string" ? de64(encryption) : (encryption as ArrayBuffer);

  const iv = new Uint8Array(encrypted.slice(0, ivl));
  const data = new Uint8Array(encrypted.slice(ivl));

  const decrypted = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    data,
  );

  const decryption = new TextDecoder().decode(decrypted);
  return decryption;
};

export const en64 = (buf: ArrayBuffer) => {
  const bytes = new Uint8Array(buf);
  return btoa(String.fromCharCode(...bytes));
};
export const de64 = (base64: string) => {
  const binstr = atob(base64);
  const bytes = new Uint8Array(binstr.length);
  for (let i = 0; i < binstr.length; i++) {
    bytes[i] = binstr.charCodeAt(i);
  }
  return bytes.buffer;
};
