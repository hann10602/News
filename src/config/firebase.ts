import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { collection, doc, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_64BY2gXSepcumcjreUVVaQ1vRwKM2Gw",
  authDomain: "news-8e9b0.firebaseapp.com",
  projectId: "news-8e9b0",
  storageBucket: "news-8e9b0.appspot.com",
  messagingSenderId: "1075759660640",
  appId: "1:1075759660640:web:ef5bb9bb079ea9a4af0d05",
  measurementId: "G-WCCBF7437S",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);

export const categoryCollection = collection(db, "category");
export const newsCollection = collection(db, "news");
export const userCollection = collection(db, "user");

export const categoryDoc = (id: string) => {
  return doc(db, "category", id);
};

export const newsDoc = (id: string) => {
  return doc(db, "news", id);
};

export const userDoc = (id: string) => {
  return doc(db, "user", id);
};
