import MainHeader from "../components/common/MainHeader";
import RectangularButton from "../components/common/buttons/RectangularButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TempIcon from "../assets/icon/navh-directoryRename.svg";
import ChangeNickButton from "../components/myPage/ChangeNickButton";
import MainNav from "../components/common/MainNav";
import "./MyPage.css";
import ProfileCircle from "../components/myPage/ProfileCircle";

// 1. 가운데 동그란 프로필 사진
// 1-1. 동그란 사진 아래에 버튼 누르면 (사진 보관함 연결 버튼 보이게 클릭)
// 2. 아래 닉네임 text
// 3. 이메일 text
// 4. 닉네임 변경 버튼 생성
// 5. 라인 그리기
// 6. 아래에 로그아웃, 회원탈퇴 버튼 생성

const MyPage = () => {
  const nav = useNavigate();

  return (
    <>
      <div>
        <div className="mypage-header">
          <MainHeader
            title="My Page"
            icon={
              <img src={TempIcon} alt="thirdIcon" className="header-icon" />
            }
          />
        </div>
        <div className="mypage-main-content">
          <ProfileCircle />
          <div className="nickname">
            {/* 임시 이름 */}
            꽃든포차코
          </div>
          <div className="email">
            {/* 임시 이메일 */}
            frazzle@gmail.com
          </div>
          <div>
            <ChangeNickButton
              onClick={() => nav("/mypage/edit")}
              text="닉네임 변경"
            />
          </div>
          <div>{/* 라인 */}</div>
          <div></div>
          <RectangularButton
            onClick={() => nav("/home")} // logout modal
            text={"로그 아웃"}
            type={"purple"}
          />
          <RectangularButton
            onClick={() => nav("/home")} // logout modal
            text={"회원 탈퇴"}
            type={"reverse_purple"}
          />
        </div>
        <div className="mypage-footer">
          <MainNav />
        </div>
      </div>
    </>
  );
};

export default MyPage;
