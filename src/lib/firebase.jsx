
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDkX-HX022jLYd-RnqpKhy1DcRgEtesRLk",
  authDomain: "threads-clone-a67af.firebaseapp.com",
  projectId: "threads-clone-a67af",
  storageBucket: "threads-clone-a67af.appspot.com",
  messagingSenderId: "365036488522",
  appId: "1:365036488522:web:efda9d50f66e33853ba3b3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app); 