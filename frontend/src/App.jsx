import "./App.css";
import "./index.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Notification from "./pages/Notification";
import MyPage from "./pages/MyPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </>
  );
}

export default App;
