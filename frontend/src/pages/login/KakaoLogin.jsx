import React, { useEffect } from "react";
import authApi from "../../apis/authApi";

const KakaoLogin = () => {
  const getAccessToken = (url) => {
    const urlParams = new URLSearchParams(url.split("?")[1]);
    return urlParams.get("code");
  };

  useEffect(() => {
    const code = getAccessToken(window.location.href);
    console.log("kakaoAccessToken", code);

    sendKakaoAccessToken(code).then(() => {
      window.location.href = import.meta.env.VITE_FRONT_URL + "/home";
    });
  }, []);

  const sendKakaoAccessToken = async (code) => {
    const data = {
      accessToken: code,
    };
    await authApi.post("/kakao", data);
  };

  return <div>Processing login...</div>;
};

export default KakaoLogin;
