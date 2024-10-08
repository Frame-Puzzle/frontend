import MainHeader from "../components/common/MainHeader";
import RectangularButton from "../components/common/buttons/RectangularButton";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ChangeNickButton from "../components/myPage/ChangeNickButton";
import MainNav from "../components/common/MainNav";
import "./MyPage.css";
import ProfileCircle from "../components/myPage/ProfileCircle";
import userApi from "../apis/userApi";
import {
  setAccessToken,
  setNickName,
  setProfileImg,
} from "../stores/userSlice";
import { useDispatch } from "react-redux";
import MypageModalFrame from "./modalFrame/MypageModalFrame";

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
  const [modalFrame, setModalFrame] = useState(false);
  const [modal, setModal] = useState(0);
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

  const logout = () => {
    setModalFrame(true);
    setModal(1);
    // 아래 두 줄은 로그아웃 컴포넌트에서 확인 버튼을 눌렀을 때 활성화 시켜야 한다.
    // dispatch(setAccessToken(""));
    // nav("/");
  };

  const exitFrazzle = async () => {
    setModalFrame(true);
    setModal(2);
    // 아래 네 줄은 회원탈퇴 컴포넌트에서 확인 버튼을 눌렀을 때 활성화 시켜야 한다.
    // const response = await userApi.delete();
    // dispatch(setAccessToken(""));
    // localStorage.clear();
    // nav("/");
  };

  return (
    <div className="w-full h-full relative">
      { modalFrame ? <MypageModalFrame modal={modal} setModalFrame={setModalFrame} /> : null }
      <div className="mypage-header">
        {/* <MainHeader />에 icon props로 건네주는 img의 width는 항상 120%로 고정하는 것으로 약속한다. */}
        {/* <MainHeader />에 path를 "/home"으로 해야하는 이유는 닉네임 변경 후 자동으로 마이페이지로 라우팅 된 후에 마이페이지에서 뒤로 가기를 누르면
        홈으로 라우팅 되는 것이 아니라 다시 닉네임 변경 페이지로 라우팅되기 때문이다. */}
        <MainHeader title="My Page" path="/home" />
      </div>
      <div className="mypage-main-content">
        <div className="profile">
          <ProfileCircle />
        </div>
        <div className="nickname">{userData.nickname}</div>
        <div className="email">{userData.email}</div>
        <div>
          <ChangeNickButton
            onClick={() => nav("/mypage/edit")}
            text="닉네임 변경"
            nickname={userData.nickname}
          />
        </div>
        <hr className="mypage-line"></hr>
        <div>
          <RectangularButton
            onClick={logout} // logout modal
            text={"로그아웃"}
            type={"purple"}
          />
        </div>
        <div>
          <RectangularButton
            onClick={exitFrazzle} // logout modal
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
