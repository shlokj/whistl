/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect, useState, useRef, useContext } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Button, Input, Flex, VStack, Text, Heading } from "@chakra-ui/react";
import { AuthContext } from "../utils/auth";
import { Redirect } from "wouter";


function SignUp() {
  const [recaptcha, setRecaptcha] = useState(null);
  const element = useRef(null);
  const { auth, user } = useContext(AuthContext);

  useEffect(() => {
    if (!recaptcha) {
      const verifier = new RecaptchaVerifier(
        element.current,
        {
          size: "invisible",
        },
        auth
      );

      verifier.verify().then(() => setRecaptcha(verifier));
    }
  }, []);

  return (
    <>
      {user ? (
        <Redirect to="/" />
      ) : (
        <>
          {recaptcha && <PhoneNumberVerification recaptcha={recaptcha} />}
          <div ref={element}></div>
        </>
      )}
    </>
  );
}

function PhoneNumberVerification({ recaptcha }) {
  const [phone, setPhone] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [code, setCode] = useState("");
  const { auth, setUser } = useContext(AuthContext);

  const phoneNumber = `+1${phone}`;

  const signIn = async () => {
    setConfirmationResult(
      await signInWithPhoneNumber(auth, phoneNumber, recaptcha)
    );
  };

  const verifyCode = async () => {
    confirmationResult
      .confirm(code)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <VStack>
        <Text>Phone number</Text>
        <Input
          type="tel"
          autoComplete="tel"
          placeholder="1234567890"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Button
          ml="8px"
          bg="darkGreen"
          color="white"
          _hover={{ bg: "carrot" }}
          onClick={signIn}
        >
          Sign In
        </Button>
      </VStack>

      {confirmationResult && (
        <VStack>
          <Text>Please verify with the code sent to your phone</Text>
          <Input type="number" autoComplete="one-time-code" value={code} onChange={(e) => setCode(e.target.value)} />
          <Button
            ml="8px"
            bg="darkGreen"
            color="white"
            _hover={{ bg: "carrot" }}
            onClick={verifyCode}
          >
            Verify Code
          </Button>
        </VStack>
      )}
    </>
  );
}

export default function Login() {
  return (
    <VStack
      bg="lightGreen"
      minHeight="100vh"
      align="center"
      justifyContent="center"
      backgroundImage={`url(${backgroundSvg})`}
      backgroundSize="100% auto"
      backgroundRepeat="no-repeat"
    >
      <Heading as="h4" size="sm" color="darkGreen">
        Welcome to:
      </Heading>
      <Heading as="h1" size="xl" color="darkGreen" fontFamily="Recoleta">
        Hereful
      </Heading>

      <SignUp />
      <Text>Terms & Conditions</Text>
    </VStack>
  );
}
