// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDd11tJOAYirrnvlwGrunvpQK5NxCoA6nU",
  authDomain: "knowtogether-888b7.firebaseapp.com",
  projectId: "knowtogether-888b7",
  storageBucket: "knowtogether-888b7.appspot.com", // 🔧 Fixed .app to .app**spot.com**
  messagingSenderId: "426281276231",
  appId: "1:426281276231:web:f763f9bfb2b536ee04b262",
  measurementId: "G-0C23FMGQ7X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Export Auth & Google Provider
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
