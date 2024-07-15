import axios from "axios";
import { env } from "@/env";
import jwt from "jsonwebtoken";
import type { TokenResponse, ServiceAccount } from "@/server/trpc/resource/sa";

export const getAccessToken = async () => {
  const sa = JSON.parse(env.SA) as ServiceAccount;
  const params = {
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    assertion: signedJWT(
      sa.private_key,
      sa.client_email,
      sa.client_email,
      sa.token_uri,
    ),
  };

  // const creds = [
  //   sa.private_key,
  //   sa.client_email,
  //   sa.client_email,
  //   sa.token_uri,
  // ];

  try {
    const { data } = await axios.post<TokenResponse>(
      sa.token_uri,
      new URLSearchParams(params),
    );
    return data.access_token;
  } catch (e) {
    return e;
  }
};

const signedJWT = (
  privateKey: string,
  iss: string,
  sub: string,
  aud: string,
) => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 3600; // Token expires in 1 hour
  const claim = {
    iat: iat,
    exp: exp,
    iss: iss,
    sub: sub,
    aud: "https://documentai.googleapis.com",
  };

  // const header = { alg: "RS256", typ: "JWT" };
  return jwt.sign(claim, privateKey, { algorithm: "RS256" });
  // return [claim, privateKey, { algorithm: "RS256" }];
  // return signed
  // const headerBase64 = Buffer.from(JSON.stringify(header)).toString("base64");
  // const claimBase64 = Buffer.from(JSON.stringify(claim)).toString("base64");
  // const signature = createSignature(
  //   `${headerBase64}.${claimBase64}`,
  //   privateKey,
  // );

  // return `${headerBase64}.${claimBase64}.${signature}`;
};

// Function to create signature
// const createSignature = (data: string, privateKey: string) => {
//   const sign = jwt.sign("RSA-SHA256");
//   sign.update(data);
//   return sign.sign(privateKey, "base64");
// };
