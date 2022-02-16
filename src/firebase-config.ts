// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxE73iAPEwRRmV_kb6KouRm0aMdKhnfVI",
  authDomain: "glassflow-5d9f5.firebaseapp.com",
  projectId: "glassflow-5d9f5",
  storageBucket: "glassflow-5d9f5.appspot.com",
  messagingSenderId: "372793383059",
  appId: "1:372793383059:web:bc792542635cb647dc5566"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);