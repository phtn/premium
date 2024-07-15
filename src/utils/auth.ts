import { JWT } from "google-auth-library";

export const getAccessToken = async () => {
  const keyFile = "./sa.json";

  const client = new JWT({
    email: "",
    keyFile,
  });

  await client.authorize();

  return client.credentials.access_token;
};
