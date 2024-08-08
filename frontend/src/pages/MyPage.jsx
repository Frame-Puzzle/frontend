import MainHeader from "../components/common/MainHeader";
import RectangularButton from "../components/common/buttons/RectangularButton";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ChangeNickButton from "../components/myPage/ChangeNickButton";
import MainNav from "../components/common/MainNav";
import "./MyPage.css";
import ProfileCircle from "../components/myPage/ProfileCircle";
import userApi from "../apis/userApi";
import { setNickName, setProfileImg } from "../stores/userSlice";
import { useDispatch } from "react-redux";

// 1. 가운데 동그란 프로필 사진
// 1-1. 동그란 사진 아래에 버튼 누르면 (사진 보관함 연결 버튼 보이게 클릭)
// 2. 아래 닉네임 text
// 3. 이메일 text
// 4. 닉네임 변경 버튼 생성
// 5. 라인 그리기
// 6. 아래에 로그아웃, 회원탈퇴 버튼 생성

const MyPage = () => {
  const nav = useNavigate();
  const [userData, setuserData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await userApi.get("");
        const data = response.data.data;

        setuserData(data);
        dispatch(setNickName(data.nickname));

        if (data.profileImg) {
          dispatch(setProfileImg(data.profileImg));
        }
      } catch (error) {
        console.error(error);
        alert("데이터를 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="w-full h-full">
      <div className="mypage-header">
        {/* <MainHeader />에 icon props로 건네주는 img의 width는 항상 120%로 고정하는 것으로 약속한다. */}
        <MainHeader title="My Page" />
      </div>
      <div className="mypage-main-content">
        <ProfileCircle />
        <div className="nickname">{userData.nickname}</div>
        <div className="email">{userData.email}</div>
        <div style={{ height: "10%" }}>
          <ChangeNickButton
            onClick={() => nav("/mypage/edit")}
            text="닉네임 변경"
            nickname={userData.nickname}
          />
        </div>
        <div>{/* 라인 */}</div>
        <div style={{ height: "10%" }}>
          <RectangularButton
            onClick={() => nav("/home")} // logout modal
            text={"로그 아웃"}
            type={"purple"}
          />
        </div>
        <div style={{ height: "10%" }}>
          <RectangularButton
            onClick={() => nav("/home")} // logout modal
            text={"회원 탈퇴"}
            type={"reverse-purple"}
          />
        </div>
      </div>
      <div className="mypage-footer">
        <MainNav />
      </div>
    </div>
  );
};

export default MyPage;
