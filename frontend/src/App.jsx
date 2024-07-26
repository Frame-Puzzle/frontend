import "./App.css";
import "./index.css";
import { Routes, Route, Router } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/Home";
import Notification from "./pages/Notification";
import MyPage from "./pages/MyPage";
import GoogleLogin from "./pages/login/GoogleLogin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/mypage" element={<MyPage />} />

        {/* 로그인 API */}
        <Route path="/" element={<Login />} />
        <Route path="/login/oauth2/code/google" element={<GoogleLogin />} />
      </Routes>
    </>
  );
}

export default App;
