import React from "react";
import { useContext, useEffect } from "react";
import { AuthContext } from "../utils/auth";
import { signOut } from "firebase/auth";
import { Redirect } from "wouter";

export default function Logout() {
  const { auth, setUser } = useContext(AuthContext);

  useEffect(() => {
    signOut(auth).then(() => {
      console.log('Successfully signed out');
      setUser(null);
    }).catch((err) => {
      console.log(err);
    });
  }, [])

  return (
    <Redirect to="/" />
  )
}
