import React, { useEffect } from "react";
import authApi from "../../apis/authApi";

const GoogleLogin = () => {
  const getAccessToken = (url) => {
    const urlParams = new URLSearchParams(url.split("?")[1]);
    return urlParams.get("code");
  };

  useEffect(() => {
    const code = getAccessToken(window.location.href);
    console.log("googleAccessToken", code);

    sendGoogleAccessToken(code).then(() => {
      window.location.href = import.meta.env.VITE_FRONT_URL + "/home";
    });
  }, []);

  const sendGoogleAccessToken = async (code) => {
    const data = {
      accessToken: code,
    };
    await authApi.post("/google", data);
  };

  return <div>Processing login...</div>;
};

export default GoogleLogin;
