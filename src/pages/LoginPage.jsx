import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const LoginPage = () => {
  const handleSuccess = (response) => {
    const decoded = jwt_decode(response.credential);
    console.log("User Info:", decoded);
    alert(`Welcome, ${decoded.name}`);
  };

  const handleFailure = (error) => {
    console.log("Login Failed:", error);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login with Google</h2>
      <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
    </div>
  );
};

export default LoginPage;
