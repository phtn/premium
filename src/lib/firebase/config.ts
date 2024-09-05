import { initializeApp as init } from "firebase/app";
import { getAuth } from "firebase/auth";
import { env } from "@/env";

const config = {
  apiKey: env.NEXT_PUBLIC_F_API_KEY,
  authDomain: env.NEXT_PUBLIC_F_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_F_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_F_STORAGE,
  messagingSenderId: env.NEXT_PUBLIC_F_MESSAGING_ID,
  appId: env.NEXT_PUBLIC_F_APP_ID,
  measurementId: env.NEXT_PUBLIC_F_MEASUREMENT,
};

const app = init(config);
export const auth = getAuth(app);
