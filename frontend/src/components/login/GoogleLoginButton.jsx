import React, { useEffect } from "react";
import "./GoogleLoginButton.css";

const GoogleLoginButton = () => {

  const loginWithGoogle = () => {

    const googleURL = `https://accounts.google.com/o/oauth2/v2/auth?
		client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}
		&redirect_uri=${import.meta.env.VITE_GOOGLE_REDIRECT_URI}
		&response_type=code
		&scope=email profile`

    // 구글 로그인 화면 이동
    window.location.href = googleURL;
  }

  return (
    <div className="google-button flex align-items-center" onClick={ loginWithGoogle }>
      <img src="/img/google-logo.png" alt="google-logo" />
      <span>구글로 로그인</span>
    </div>
  );
};

export default GoogleLoginButton;
