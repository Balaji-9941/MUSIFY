import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAV197DuG7plDViVBruT9uGPV1L-3Jjir4",
  authDomain: "musify-b7e56.firebaseapp.com",
  projectId: "musify-b7e56",
  storageBucket: "musify-b7e56.firebasestorage.app",
  messagingSenderId: "703768960995",  
  appId: "1:703768960995:web:3c790d77f3bf15c8c9cad6",
};

export const app = initializeApp(firebaseConfig);
export let _Auth = getAuth(app);
export let _DB = getFirestore(app);
