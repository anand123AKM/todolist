import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRvQcUiiMkDIYEF-EppQqugYIPdeHPEeQ",
  authDomain: "task-master-7.firebaseapp.com",
  projectId: "task-master-7",
  storageBucket: "task-master-7.appspot.com",
  messagingSenderId: "1045421667712",
  appId: "1:1045421667712:web:11c725ef82000a1430fd65",
  measurementId: "G-F5WG7PDSTN",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, collection, doc, setDoc };
