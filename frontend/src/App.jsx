import "./App.css";
import "./index.css";
import { Routes, Route, Router } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/Home";
import Notification from "./pages/Notification";
import MyPage from "./pages/MyPage";
import ChangeNickName from "./pages/ChangeNickName";
import GoogleLogin from "./pages/login/GoogleLogin";
import KakaoLogin from "./pages/login/KakaoLogin";
import Loading from "./pages/Loading";
import PuzzleBoard from "./pages/PuzzleBoard";
import { useEffect } from "react";

function App() {
  const setScreenSize = () => {
    let vw = window.innerWidth * 0.01;
    document.documentElement.style.setProperty("--vw", `${vw}px`);
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  useEffect(() => {
    setScreenSize();
  });

  return (
    <div className="main-frame">
      <Routes>

        {/* 홈페이지, 메인페이지 */}
        <Route path="/home" element={<Home />} />

        {/* 알림 페이지 */}
        <Route path="/notification" element={<Notification />} />

        {/* 마이 페이지 */}
        <Route path="/mypage" element={<MyPage />} />

        {/* 마이 페이지 중 닉네임 변경 페이지 */}
        <Route path="/mypage/edit" element={<ChangeNickName />} />

        {/* Google Login API */}
        <Route path="/" element={<Login />} />
        <Route path="/login/oauth2/code/google" element={<GoogleLogin />} />

        {/* Kakao Login API */}
        <Route path="/login/oauth2/code/kakao" element={<KakaoLogin />} />

        {/* Loading viewport test */}
        <Route path="/loading" element={<Loading />} />

        {/* 퍼즐 저장 공간*/}
        <Route path="/puzzle" element={<PuzzleBoard />} />

      </Routes>
    </div>
  );
}

export default App;
