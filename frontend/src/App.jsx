import "./App.css";
import "./index.css";
import { Routes, Route, Router } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/Home";
import Notification from "./pages/Notification";
import MyPage from "./pages/MyPage";
import GoogleLogin from "./pages/login/GoogleLogin";

import { useEffect } from "react";

function App() {

  const setScreenSize = () => {
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

        {/* 로그인 API */}
        <Route path="/" element={<Login />} />
        <Route path="/login/oauth2/code/google" element={<GoogleLogin />} />
      </Routes>
    </div>
  );
}

export default App;
