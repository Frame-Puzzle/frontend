import react, { useEffect, useState } from "react";
import MainHeader from "../components/common/MainHeader";
import { useSelector, useDispatch } from "react-redux";
import MainNav from "../components/common/MainNav";
import "./ChangeNickName.css";
import { setNickName } from "../stores/userSlice";
import userApi from "../apis/userApi";
import { useNavigate } from "react-router-dom";

// 1. 가운데 동그란 프로필 사진
// 1-1. 동그란 사진 아래에 버튼 누르면 (사진 보관함 연결 버튼 보이게 클릭)
// 2. 아래 닉네임 text
// 3. 이메일 text
// 4. 닉네임 변경 버튼 생성
// 5. 라인 그리기
// 6. 아래에 로그아웃, 회원탈퇴 버튼 생성

const ChangeNickName = () => {
  const nav = useNavigate();

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [newNickName, setNewNickName] = useState("");
  const [isDuplicated, setIsDuplicated] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const submitNewNickName = async () => {
    const data = {
      nickname: newNickName,
    };
    const response = await userApi.put(`/nickname`, data);
    dispatch(setNickName(response.data.nickname));

    nav("/mypage");
  };
  const handleNickNameChange = (e) => {
    setNewNickName(e.target.value);
  };

  useEffect(() => {
    const checkIsDuplicated = async (name) => {
      const response = await userApi.get(`/find?nickname=${newNickName}`);

      setIsDuplicated(response.data.data.isExistNickname);
    };

    let intervalId;

    if (isFocused) {
      intervalId = setInterval(() => {
        checkIsDuplicated(newNickName);
      }, 500);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isFocused, newNickName, isDuplicated]);

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
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={user.nickName}
            className="nickname-input"
          />
          {!isDuplicated && newNickName !== "" && (
            <div>
              <p>사용 가능한 닉네임입니다.</p>
            </div>
          )}
          {newNickName === "" && (
            <div>
              <p>닉네임을 입력해주세요</p>
            </div>
          )}
          {isDuplicated && newNickName !== "" && (
            <div>
              <p>사용 불가능한 닉네임입니다.</p>
            </div>
          )}
          <button
            className="nickname-confirm"
            onClick={submitNewNickName}
            disabled={isDuplicated || newNickName === ""}
          >
            확인
          </button>
        </div>
        <div className="change-nick-name-footer">
          <MainNav />
        </div>
      </div>
    </>
  );
};

export default ChangeNickName;
