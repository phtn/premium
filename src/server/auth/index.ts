// import { auth } from "@/lib/firebase/config";
// import {
//   signInWithPhoneNumber,
//   RecaptchaVerifier,
//   GoogleAuthProvider,
//   signInWithPopup,
//   getAdditionalUserInfo,
//   User,
//   AdditionalUserInfo,
//   OAuthCredential,
// } from "firebase/auth";
// import { SignInWithPhoneParams } from "./resource";
// import { errHandler } from "@/utils/helpers";

// // const appVerifier = (() =>  {
// //   if (typeof window !== "undefined") {
// //     return window.recaptchaVerifier = new RecaptchaVerifier(auth, '')
// //   }
// // });
// auth.settings.appVerificationDisabledForTesting = true;

// var phoneNumber = "+16505554567";
// var testVerificationCode = "123456";

// const appVerifier = new RecaptchaVerifier(auth, "muffuckuh");

// export const signInWithPhone = async ({ phoneNumber }: SignInWithPhoneParams) =>
//   null;
// // await signInWithPhoneNumber(auth, phoneNumber, appVerifier);

// export const signInWithPhoneTest = async () => null;
// // await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
// //   .then((confirmation) => {
// //     return confirmation.confirm(testVerificationCode);
// //   })
// //   .catch(errHandler);

// interface AuthResult {
//   token: string | undefined;
//   user: User;
//   extra: AdditionalUserInfo | null;
// }
// interface AuthError {
//   code: string;
//   message: string;
//   email: string;
//   credential: OAuthCredential | null;
// }
// export type SignInWithGoogleResource = AuthResult | AuthError;

// // const google = new GoogleAuthProvider();
// // export const signInWithGoogle = async () => {
// //   signInWithPopup(auth, google)
// //     .then((result) => {
// //       const credential = GoogleAuthProvider.credentialFromResult(result);
// //       const token = credential?.accessToken;
// //       const user = result.user;
// //       const extra = getAdditionalUserInfo(result);
// //       return { token, user, extra };
// //     })
// //     .catch((e) => {
// //       const code = e.code;
// //       const message = e.message;
// //       const email = e.customData.email;
// //       const credential = GoogleAuthProvider.credentialFromError(e);
// //       return { code, message, email, credential };
// //     });
// // };
