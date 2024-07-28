import React, { useEffect } from "react";

const KakaoLoginButton = () => {

  const loginWithKakao = () => {

    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`;

    console.log(kakaoURL);

    // 카카오 로그인 화면 이동
    window.location.href = kakaoURL;
  };

  return (
    <div>
      <button onClick={loginWithKakao}>카카오로 로그인</button>
    </div>
  );
};

export default KakaoLoginButton;
