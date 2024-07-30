import MainHeader from "../components/common/MainHeader";
import RectangularButton from "../components/common/buttons/RectangularButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { ReactComponent as Icon } from "../assets/icon/navh-directoryRename.svg";
import "./MyPage.css";

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
    <div>
      <MainHeader title="My Page" icon={<Icon />} />
      <div className="logout">
        <RectangularButton
          onClick={() => nav("/home")} // logout modal
          text={"로그 아웃"}
          type={"purple"}
        />
      </div>
      <div className="exit">
        <RectangularButton
          onClick={() => nav("/home")} // logout modal
          text={"회원 탈퇴"}
          type={"reverse_purple"}
        />
      </div>
    </div>
  );
};

export default MyPage;
