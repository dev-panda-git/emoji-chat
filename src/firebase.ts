// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAD8QmHGRJ5yh_uOfEoLqrVX2VoS0Or9ZE",
  authDomain: "emoji-chat-10104.firebaseapp.com",
  projectId: "emoji-chat-10104",
  storageBucket: "emoji-chat-10104.appspot.com",
  messagingSenderId: "369116995845",
  appId: "1:369116995845:web:4819ccbf28eb4e4015d76c",
  measurementId: "G-XVDS6KLSLZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
