import "./App.css";
import "./index.css";
import { Routes, Route, Router } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/Home";
import Notification from "./pages/Notification";
import MyPage from "./pages/MyPage";
import GoogleLogin from "./pages/login/GoogleLogin";
import KakaoLogin from "./pages/login/KakaoLogin";

import { useEffect } from "react";

function App() {

  const setScreenSize = () => {
    let vw = window.innerWidth * 0.01;
    document.documentElement.style.setProperty("--vw", `${vw}px`);
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  
  useEffect(() => {
    setScreenSize();
  });

  return (
    <div className="main-frame">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/mypage" element={<MyPage />} />

        {/* Google Login API */}
        <Route path="/" element={<Login />} />
        <Route path="/login/oauth2/code/google" element={<GoogleLogin />} />

        {/* Kakao Login API */}
        <Route path="/login/oauth2/code/kakao" element={<KakaoLogin />} />
      </Routes>
    </div>
  );
}

export default App;
