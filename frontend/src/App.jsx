import "./App.css";
import "./index.css";
import { Routes, Route, Router } from "react-router-dom";
import Login from "./pages/Login";


function App() {
  return (
    <>
      {/*<Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/mypage" element={<MyPage />} /> </Routes>*/}

        <Routes>
          <Route path="/" element={<Login/>}/>
        </Routes>
    </>
  );
}

export default App;
