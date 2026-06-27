import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDHONFG24kmctewri6XovgVGdlPr6mDeh8",
  authDomain: "barin-de764.firebaseapp.com",
  projectId: "barin-de764",
  storageBucket: "barin-de764.firebasestorage.app",
  messagingSenderId: "667955034341",
  appId: "1:667955034341:web:3d8e6d04b5fba2eb4efc0c",
  measurementId: "G-ECGRM62SJY"
};

const app =
  initializeApp(
    firebaseConfig
  );

export const auth =
  getAuth(app);

export const provider =
  new GoogleAuthProvider();