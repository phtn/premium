// import { google } from "googleapis";
// import { type JWT } from "google-auth-library";
// import { env } from "@/env";

// export const getAuthClient = (): Promise<JWT | Error> => {
//   const serviceAccount = JSON.parse(env.F_ADMIN) as object;
//   const auth = new google.auth.GoogleAuth({
//     credentials: serviceAccount,
//     scopes: ["https://www.googleapis.com/auth/cloud-platform"],
//   });
//   return auth.getClient() as Promise<JWT>;
// };
