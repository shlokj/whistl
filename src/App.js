import { useState } from "react";
import { Route } from "wouter";
import "./App.css";
import Home from "./pages/Home";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import { AuthContext } from "./utils/auth";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import Login from "./pages/Login";
import Logout from "./pages/Logout";

// Initialize auth
const auth = getAuth();
setPersistence(auth, browserLocalPersistence)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

const theme = extendTheme({
  colors: {
    lightGreen: "#189AB4",
    darkGreen: "#05445E",
    carrot: "#D4F1F4",
  },
  fonts: {
    heading: 'HK Grotesk, sans-serif',
    body: 'HK Grotesk, sans-serif',
  },
  shadows: {
    lg: "0 10px 15px -3px rgba(3, 91, 33, 0.1), 0 4px 6px -2px rgba(3, 91, 33, 0.05)",
  },
});

function App() {
  const [user, setUser] = useState(null);
  const value = { auth, user, setUser };

  return (
    <ChakraProvider theme={theme}>
      <AuthContext.Provider value={value}>
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
      </AuthContext.Provider>
    </ChakraProvider>
  );
}

export default App;
