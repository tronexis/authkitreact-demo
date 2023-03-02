import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import View from "./components/View";
import { AuthProvider } from "react-auth-kit";
import SignInComponent from "./components/Signin";

function App() {
  return (
    <AuthProvider
      authType={"cookie"}
      authName={"_auth"}
      cookieDomain={window.location.hostname}
      cookieSecure={window.location.protocol === "https:"}
    >
      <SignInComponent />
    </AuthProvider>
  );
}

export default App;
