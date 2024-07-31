import React, { useEffect } from "react";
import authApi from "../../apis/authApi";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../../stores/userSlice";

const KakaoLogin = () => {

  let dispatch = useDispatch();

  const getAccessToken = (url) => {
    const urlParams = new URLSearchParams(url.split("?")[1]);
    return urlParams.get("code");
  };

  useEffect(() => {
    const code = getAccessToken(window.location.href);

    sendKakaoAccessToken(code).then(() => {
      window.location.href = import.meta.env.VITE_FRONT_URL + "/home";
    });
  }, []);

  const sendKakaoAccessToken = async (code) => {
    const data = {
      accessToken: code,
    };
    try {
      const response = await authApi.post("/kakao", data);
      const accessToken = response.data.data.accessToken;
      dispatch(setAccessToken(accessToken));
    } catch(error) {
      console.log(error);
      alert(error);
    }

  };

  return <div>Processing login...</div>;
  
};

export default KakaoLogin;
