// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-45641.firebaseapp.com",
  projectId: "real-estate-45641",
  storageBucket: "real-estate-45641.firebasestorage.app",
  messagingSenderId: "1014990710887",
  appId: "1:1014990710887:web:d2c430cdc8f0df7159ccc2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);