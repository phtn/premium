import { JWT } from "google-auth-library";

export const getAccessToken = async () => {
  const keyFile = "./sa.json";

  const client = new JWT({
    email: "documentai@fastinsure-f1801.iam.gserviceaccount.com",
    keyFile,
  });

  await client.authorize();

  return client.credentials.access_token;
};
