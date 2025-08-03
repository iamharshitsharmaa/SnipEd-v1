import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// 1. Import getFirestore
import { getFirestore } from "firebase/firestore"; 
// You can uncomment this line if you decide to use Analytics
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration should be stored in environment variables
// for security.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
// This check prevents re-initializing the app on every hot-reload in development
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// 2. Initialize Firestore and get a reference to the service
const db = getFirestore(app); 

// Initialize Analytics if you need it
// const analytics = getAnalytics(app);

// 3. Export db so you can use it elsewhere
export { app, auth, db };