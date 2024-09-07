import React, { useState, useEffect, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { Center, FormLabel, Input, Button } from "@chakra-ui/react";
import "../app.css";

const Login = ({ theme }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User registered:", userCredential.user);
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      const userId = userCredential.user.uid;
      await setDoc(doc(db, "users", userId), {
        name: name,
        email: email,
      });
      console.log("User profile document successfully created!");

      localStorage.setItem("userData", JSON.stringify(userCredential.user));
    } catch (error) {
      setError(error.message);
      console.error("Error signing up:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed in:", userCredential.user);
      localStorage.setItem("userData", JSON.stringify(userCredential.user));
    } catch (error) {
      setError(error.message);
      console.error("Error logging in:", error);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("userData");

    if (userData) {
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setStoredName(user.displayName);
          nameValue(user.displayName);
          console.log("User data fetched successfully:", userData);
        } else {
          console.log("No such document!");
          setStoredName(user.displayName);
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, [auth.currentUser]);

  return (
    <Center>
      <div className={`${theme} form`}>
        <Center>
          <h1 variant="outline" mt={8} className={`${theme} contact`}>
            {isRegistering ? "Sign Up" : "Login"}
          </h1>
        </Center>
        <form onSubmit={isRegistering ? handleSignUp : handleLogin}>
          <div>
            {isRegistering ? (
              <>
                <FormLabel className="inp">Name</FormLabel>
                <Input
                  className={`${theme} inp2`}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </>
            ) : null}
          </div>
          <div>
            <FormLabel className="inp">Email </FormLabel>
            <Input
              className={`${theme} inp2`}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <FormLabel className="inp">Password</FormLabel>
            <Input
              className={`${theme} inp2`}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={`${theme} send1`}>
            <Button
              id="verify-otp"
              className={`${theme} send2`}
              variant="outline"
              width="100px"
              mt={8}
              color={"white"}
              size="lg"
              type="submit"
            >
              {isRegistering ? "Sign Up" : "Login"}
            </Button>
            {error && (
              <p
                style={{ fontWeight: "bold", marginTop: "10px", color: "red" }}
              >
                {error}
              </p>
            )}
          </div>
        </form>
        <div className="mess">
          <button onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? (
              <>
                Already have an account?{" "}
                <span style={{ fontWeight: "bold" }}>Login</span>
              </>
            ) : (
              <>
                Don’t have an account?{" "}
                <span style={{ fontWeight: "bold" }}>Sign Up</span>
              </>
            )}
          </button>
        </div>
      </div>
    </Center>
  );
};

export default Login;
