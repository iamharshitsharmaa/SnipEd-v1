import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  type UserCredential,
} from "firebase/auth";

export const signIn = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential;
};

export const signUp = async (
  email: string,
  password: string,
  username: string,
  fullName: string
): Promise<UserCredential> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  // After creating the user, update their profile with the full name.
  // Firebase Auth has a `displayName` property, which we'll use for `fullName`.
  if (userCredential.user) {
    await updateProfile(userCredential.user, {
      displayName: fullName,
    });
  }

  // Note: The `username` is not directly stored on the Firebase Auth user object.
  // You would typically create a user document in a database like Firestore
  // using the user's ID (`userCredential.user.uid`) to store additional profile info.
  return userCredential;
};

export const signOut = async (): Promise<void> => {
  await firebaseSignOut(auth);
};
