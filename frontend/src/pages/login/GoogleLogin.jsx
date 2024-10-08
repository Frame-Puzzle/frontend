import React, { useEffect } from "react";
import authApi from "../../apis/authApi";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../../stores/userSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";

const GoogleLogin = () => {
  let dispatch = useDispatch();
  const nav = useNavigate();

  const getAccessToken = (url) => {
    const urlParams = new URLSearchParams(url.split("?")[1]);
    return urlParams.get("code");
  };

  useEffect(() => {
    const code = getAccessToken(window.location.href);

    sendGoogleAccessToken(code)
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

  const sendGoogleAccessToken = async (code) => {
    const data = {
      accessToken: code,
    };
    try {
      const response = await authApi.post("/google", data);
      const accessToken = response.data.data.accessToken;
      dispatch(setAccessToken(accessToken));
    } catch (error) {
      console.log(error);
      return error;
    }
    // JWT Token이 로컬에 잘 저장되어 있는지 확인하고 싶다면 HomePage에서
    // onClick eventListener로 console.log로 콘솔에 찍어보자.
  };

  return <Loading />;

};

export default GoogleLogin;
