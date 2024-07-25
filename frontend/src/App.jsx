import "./App.css";
import "./index.css";
import Home from "./pages/Home";
import { Routes, Route, Router } from "react-router-dom";
import Notification from "./pages/Notification";
import MyPage from "./pages/MyPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/mypage" element={<MyPage />} />

        {/* 로그인 성공 시*/}
        <Route path="/login/oauth2/code/google" />
      </Routes>
    </>
  );
}

export default App;
