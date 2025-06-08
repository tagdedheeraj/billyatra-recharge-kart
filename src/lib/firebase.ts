
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Get Firebase config from Supabase secrets
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyBBMFo9AjD8lUJgxLo5KlERcJMZsM8LpXM",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "billyatra-363cc.firebaseapp.com", 
  projectId: process.env.FIREBASE_PROJECT_ID || "billyatra-363cc",
  storageBucket: "billyatra-363cc.firebasestorage.app",
  messagingSenderId: "288179874111",
  appId: "1:288179874111:web:fbeaad77e6b883d2210b8a",
  measurementId: "G-PJ5XE7PF25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
