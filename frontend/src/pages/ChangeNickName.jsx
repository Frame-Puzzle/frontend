import react, { useState } from "react";
import MainHeader from "../components/common/MainHeader";
import { useSelector, useDispatch } from "react-redux";
import MainNav from "../components/common/MainNav";
import "./ChangeNickName.css";

// 1. 가운데 동그란 프로필 사진
// 1-1. 동그란 사진 아래에 버튼 누르면 (사진 보관함 연결 버튼 보이게 클릭)
// 2. 아래 닉네임 text
// 3. 이메일 text
// 4. 닉네임 변경 버튼 생성
// 5. 라인 그리기
// 6. 아래에 로그아웃, 회원탈퇴 버튼 생성

const ChangeNickName = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [newNickName, setNewNickName] = useState("");

  const handleNickNameChange = (e) => {
    setNewNickName(e.target.value);
  };

  const submitNewNickName = () => {
    // dispatch(updateNickName(newNickName));
  };

  return (
    <>
      <div>
        <div className="change-nick-name-header">
          <MainHeader title="닉네임 변경" />
        </div>
        <div className="change-nick-name-main-content">
          <h2> 새로운 닉네임을 입력해주세요</h2>
          <input
            type="text"
            value={newNickName}
            onChange={handleNickNameChange}
            placeholder={user.nickname}
            className="nickname-input"
          />
        </div>
        <div className="change-nick-name-footer">
          <MainNav />
        </div>
      </div>
    </>
  );
};

export default ChangeNickName;
