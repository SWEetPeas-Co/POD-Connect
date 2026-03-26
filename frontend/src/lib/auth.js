import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updatePassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "./firebase";

export const doCreateUserWithEmailAndPassword=async (EmailAuthCredential,password)=>{
    return createUserWithEmailAndPassword(auth, EmailAuthCredential, password);
    
};
export const doSignInWithEmailAndPassword=async(email,password)=>{
    const cred= await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
};

export const doSignOut=()=>{
    return auth.signOut();
};
export const doPasswordReset=(email)=>{
    return sendPasswordResetEmail(auth, email);
};
export const doPasswordChange=(password)=>{
    return updatePassword(auth.currentUser, password);
};

export async function emailExists(email) {
  const methods = await fetchSignInMethodsForEmail(auth, email);
  return methods.length > 0;
}

export async function resetPasswordIfExists(email) {
  const methods = await fetchSignInMethodsForEmail(auth, email);

  if (methods.length === 0) {
    throw new Error("No account found with that email.");
  }

  await sendPasswordResetEmail(auth, email);
}


export const doSendEmailVerification=()=>{
    return sendEmailVerification(auth.currentUser);
};
