import React from "react";
import { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

const AppName = () => {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const fetchUserName = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data().name);
        }
      }
    };

    fetchUserName();
  }, []);

  return (
    <>
      <div className="header">YOUR LIST - {" " + userName}</div>
    </>
  );
};

export default AppName;
