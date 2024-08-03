import React, { useEffect } from "react";
import authApi from "../../apis/authApi";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../../stores/userSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";


const KakaoLogin = () => {
  let dispatch = useDispatch();
  const nav = useNavigate();

  const getAccessToken = (url) => {
    const urlParams = new URLSearchParams(url.split("?")[1]);
    return urlParams.get("code");
  };

  useEffect(() => {
    const code = getAccessToken(window.location.href);

    sendKakaoAccessToken(code)
      .then(() => {
        nav("/home");
      })
      .catch((error) => {
        alert("로그인 실패");
        setTimeout(() => {
          nav("/");
        }, 1000);
      });
  });

  const sendKakaoAccessToken = async (code) => {
    const data = {
      accessToken: code,
    };
    try {
      const response = await authApi.post("/kakao", data);
      const accessToken = response.data.data.accessToken;
      dispatch(setAccessToken(accessToken));

    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return <Loading />;

};

export default KakaoLogin;
