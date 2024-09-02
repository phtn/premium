import { githubProvider, googleProvider } from "@/lib/firebase/config";
import type {
  Auth,
  AuthError,
  AuthProvider,
  CustomParameters,
  UserCredential,
} from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { useCallback, useState } from "react";

export type AuthActionHook<M> = [
  M,
  UserCredential | undefined,
  boolean,
  AuthError | undefined,
];
export type SignInWithPopupHook = AuthActionHook<
  (
    scopes?: string[],
    customOAuthParameters?: CustomParameters,
  ) => Promise<UserCredential | undefined>
>;

const useSignInWithPopup = (
  auth: Auth,
  createProvider: (
    scopes?: string[],
    customOAuthParameters?: CustomParameters,
  ) => AuthProvider,
): SignInWithPopupHook => {
  const [error, setError] = useState<AuthError>();
  const [loggedInUser, setLoggedInUser] = useState<UserCredential>();
  const [loading, setLoading] = useState<boolean>(false);

  const sign = useCallback(
    async (scopes?: string[], customOAuthParameters?: CustomParameters) => {
      setLoading(true);
      setError(undefined);
      try {
        const provider = createProvider(scopes, customOAuthParameters);
        const user = await signInWithPopup(auth, provider);
        setLoggedInUser(user);

        return user;
      } catch (err) {
        setError(err as AuthError);
      } finally {
        setLoading(false);
      }
    },
    [auth, createProvider],
  );

  return [sign, loggedInUser, loading, error];
};

export const useSignInWithGoogle = (auth: Auth): SignInWithPopupHook => {
  const createGoogleAuthProvider = useCallback(
    (scopes?: string[], customOAuthParameters?: CustomParameters) => {
      if (scopes) {
        scopes.forEach((scope) => googleProvider.addScope(scope));
      }
      if (customOAuthParameters) {
        googleProvider.setCustomParameters(customOAuthParameters);
      }
      return googleProvider;
    },
    [],
  );
  return useSignInWithPopup(auth, createGoogleAuthProvider);
};

export const useSignInWithGithub = (auth: Auth): SignInWithPopupHook => {
  const createGithubAuthProvider = useCallback(
    (scopes?: string[], customOAuthParameters?: CustomParameters) => {
      if (scopes) {
        scopes.forEach((scope) => githubProvider.addScope(scope));
      }
      if (customOAuthParameters) {
        githubProvider.setCustomParameters(customOAuthParameters);
      }
      return githubProvider;
    },
    [],
  );
  return useSignInWithPopup(auth, createGithubAuthProvider);
};
