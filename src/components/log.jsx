import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth, db, collection, doc, setDoc } from "./firebase";
import "../app.css";
import { UserContext } from "./UserContext";

export default function Login({ theme }) {
  const { setUserId } = useContext(UserContext);
  const { setIsLoggedIn } = useContext(AuthContext);
  const [otpSent, setOtpSent] = useState(false);

  const [phone, setPhone] = useState("");
  const handleChange = (event) => {
    setPhone(event.target.value);
  };

  const [name, setName] = useState("");
  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const captcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
      size: "invisible",
      callback: (response) => {
        this.onSignInSubmit();
        console.log("recaptcha verified");
      },
      defaultCountry: "IN",
    });
  };

  const onSignInSubmit = (e) => {
    e.preventDefault();
    captcha();
    const phoneNumber = "+91" + phone;
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;

    const auth = getAuth();
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log("OTP sent");
        setOtpSent(true);
      })
      .catch((error) => {
        console.error("SMS not sent", error);
      });
  };

  const [code, setCode] = useState("");

  const handleChangeCode = (event) => {
    setCode(event.target.value);
  };

  const SubmitOTP = () => {
    if (!window.confirmationResult) {
      console.error("Confirmation result is not set");
      return;
    } else {
      console.log("verified user");
    }

    window.confirmationResult
      .confirm(code)
      .then(async (result) => {
        const user = result.user;
        console.log(user);
        const userId = user.uid;
        console.log("User ID:", userId);
        setIsLoggedIn(true);
        setUserId(userId);
        try {
          const usersCollection = collection(db, "users");
          const userDoc = doc(usersCollection, userId);
          await setDoc(userDoc, { name: name });
          console.log("User profile document successfully created!");
        } catch (error) {
          console.error("Error creating user profile document: ", error);
        }
      })
      .catch((error) => {
        console.error("Error confirming OTP", error);
      });
  };

  return (
    <>
      <Center>
        <div className={`dark form`}>
          <FormControl isRequired>
            <div id="sign-in-button"></div>
            <Center>
              <h1 variant="outline" mt={8} className={`dark contact`}>
                Login
              </h1>
            </Center>
            <FormLabel className="inp">Name</FormLabel>
            <Input
              className={`dark inp2`}
              type="text"
              name="name"
              placeholder="Name"
              color={"white"}
              onChange={handleChangeName}
            />
            <>
              <FormLabel className="inp">Phone</FormLabel>
              <InputGroup>
                <Input
                  className={`dark inp2`}
                  type="tel"
                  name="phone"
                  placeholder="phone no."
                  color={"white"}
                  onChange={handleChange}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    className="otp"
                    h="1.75rem"
                    size="sm"
                    onClick={onSignInSubmit}
                  >
                    OTP {otpSent && <span style={{ color: "green" }}>✔</span>}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </>
            <FormLabel className="inp">OTP</FormLabel>
            <Input
              className={`dark inp2`}
              type="number"
              name="otp"
              placeholder="OTP"
              color={"white"}
              value={code}
              onChange={handleChangeCode}
            />

            <div className={`${theme} send1`}>
              <Button
                className={`${theme} send2`}
                variant="outline"
                width="100px"
                mt={8}
                color={"white"}
                size="lg"
                onClick={SubmitOTP}
              >
                Login
              </Button>
            </div>
          </FormControl>
        </div>
      </Center>
    </>
  );
}
