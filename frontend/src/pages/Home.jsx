/*eslint-diable*/
import MainNav from "../components/common/MainNav";
import MainSwipe from "./../components/common/MainSwipe";
import HomeModalFrame from "./modalFrame/HomeModalFrame";
import DirectoryList from "./../components/home/DirectoryList";
import "./Home.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import userApi from "../apis/userApi";
import { useDispatch } from "react-redux";

const Home = () => {
  let [modal, setModal] = useState(false);
  const [userNickName, showUserNickName] = useState("");

  // JWT Token Test
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await userApi.get("");
        const data = response.data.data;

        showUserNickName(data.nickname);
      } catch (error) {
        console.error(error);
        alert("데이터를 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchUserData();
  }, [dispatch]);

  return (
    // Page 단위의 Component의 최상위 요소에는 반드시 width: 100%와 height: 100% 속성이 필요하다.*/
    <div className="w-full h-full flex flex-wrap relative">
      {modal ? <HomeModalFrame setModal={setModal} /> : null}
      <div className="home-main-content bg-color1">
        <div className="top-title">HOME</div>
        <div className="user-info">
          {" "}
          안녕하세요
          <br />
          {userNickName} 님
        </div>
        <div className="home-swipe-content">
          <MainSwipe />
        </div>
        <div className="make-dir-container">
          <span
            className="make-dir"
            onClick={() => {
              setModal(true);
            }}
          >
            새 디렉토리 만들기
          </span>
        </div>
        <div className="home-under-white-bg">
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
