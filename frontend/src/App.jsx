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
import Directory from "./pages/directory/Directory";
import { useEffect } from "react";
import CreateBoard from "./pages/board/CreateBoard";
import BoardSelectSize from "./components/common/BoardSelectSize";
import BoardMissionOn from "./components/common/BoardMissionOn";
import BoardMissionOff from "./components/common/BoardMissionOff";
import BoardSelectMission from "./components/common/BoardSelectMission";
import GameOpenVidu from "./components/gameTalk/GameOpenvidu";

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

        {/* !!! 테스트 페이지 rtc !!!*/}
        <Route path="/testrtc" element={<GameOpenVidu />} />

        {/* Google Login API */}
        <Route path="/" element={<Login />} />
        <Route path="/login/oauth2/code/google" element={<GoogleLogin />} />

        {/* Kakao Login API */}
        <Route path="/login/oauth2/code/kakao" element={<KakaoLogin />} />

        {/* Loading viewport test */}
        <Route path="/loading" element={<Loading />} />

        {/* 고유 디렉토리로 구분되는 디렉토리 상세페이지 */}
        <Route path="/directories/:id" element={<Directory />} />

        {/* 퍼즐 저장 공간*/}
        <Route path="/puzzle" element={<PuzzleBoard />} />

        {/* 퍼즐판 생성 페이지 */}
        <Route path="/create-board" element={<CreateBoard />}>
          <Route path="select-size" element={<BoardSelectSize />} />
          <Route path="mission-on" element={<BoardMissionOn />} />
          <Route path="mission-off" element={<BoardMissionOff />} />
          <Route path="select-mission" element={<BoardSelectMission />} />
          <Route />
        </Route>

        {/* 퍼즐판 상세페이지 */}
        <Route path="/boards/:boardID" element={<PuzzleBoard />} />
        
      </Routes>
    </div>
  );
}

export default App;
