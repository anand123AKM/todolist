import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqHJZXLdJHlxDV8t9pRIA_tOn7oreUCM0",
  authDomain: "car-racing-57ff4.firebaseapp.com",
  projectId: "car-racing-57ff4",
  storageBucket: "car-racing-57ff4.appspot.com",
  messagingSenderId: "592006086642",
  appId: "1:592006086642:web:6620d741b227943202356b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, collection, doc, setDoc };
