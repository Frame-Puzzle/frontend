/*eslint-diable*/
import MainNav from "../components/common/MainNav";
import MainSwipe from "./../components/common/MainSwipe";
import HomeModalFrame from "./modalFrame/HomeModalFrame";
import DirectoryList from "./../components/common/DirectoryList";
import "./Home.css";
import { useState } from "react";

const Home = () => {

  let [modal, setModal] = useState(false);

  return (
    // Page 단위의 Component의 최상위 요소에는 반드시 width: 100%와 height: 100% 속성이 필요하다.*/
    <div className="w-full h-full flex flex-wrap relative">
      {modal ? <HomeModalFrame /> : null}
      <div className="home-main-content bg-color1">
        <div className="top-title">HOME</div>
        <div className="user-info">
          <p>안녕하세요</p>
          {/* use Redux */}
          <p>???? 님</p>
        </div>
        <div>
          <MainSwipe />
        </div>
        <div>
          <span className="make-dir" onClick={() => {
            setModal(true);
          }}>새 디렉토리 만들기</span>
        </div>
        <div>
          <DirectoryList />
        </div>
      </div>
      <div className="home-footer">
        <MainNav />
      </div>
    </div>
  );
};

export default Home;
