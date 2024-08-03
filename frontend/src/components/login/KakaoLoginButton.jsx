import React, { useEffect } from "react";
import "./KakaoLoginButton.css";

const KakaoLoginButton = () => {

  const loginWithKakao = () => {

    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`;

    console.log(kakaoURL);

    // 카카오 로그인 화면 이동
    window.location.href = kakaoURL;
  };

  return (
    <div className="kakao-button flex align-items-center" onClick={ loginWithKakao }>
      <img src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/kakao-logo.png" alt="kakao-logo" />
      <span>카카오톡으로 로그인</span>
    </div>
  );
};

export default KakaoLoginButton;
