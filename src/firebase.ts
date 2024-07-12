import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJ8HZps54M1afuQ20ttGPf-HmfnLZRjkg",
  authDomain: "emoji-chat-60572.firebaseapp.com",
  projectId: "emoji-chat-60572",
  storageBucket: "emoji-chat-60572.appspot.com",
  messagingSenderId: "312436477622",
  appId: "1:312436477622:web:0841161ae6a0e34dda6017",
  measurementId: "G-1J7N7PRH3M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
