import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDeQOvd9koEo56dH2cfy5fTkE6D_1PzOT4",
  authDomain: "todo-f4083.firebaseapp.com",
  projectId: "todo-f4083",
  storageBucket: "todo-f4083.appspot.com",
  messagingSenderId: "763604147119",
  appId: "1:763604147119:web:da75b92d0253e64aa4ed5a",
  measurementId: "G-82LC44WMGT",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, collection, doc, setDoc };
