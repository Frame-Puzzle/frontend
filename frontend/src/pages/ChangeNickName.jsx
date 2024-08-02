import React, { useEffect, useState } from "react";
import MainHeader from "../components/common/MainHeader";
import { useSelector, useDispatch } from "react-redux";
import MainNav from "../components/common/MainNav";
import "./ChangeNickName.css";
import { setNickName } from "../stores/userSlice";
import userApi from "../apis/userApi";
import { useNavigate } from "react-router-dom";
import checkAvailableWord from "../utils/stringConfig/checkAvailableWord";
import checkWordLength from "../utils/stringConfig/checkWordLength";

const ChangeNickName = () => {
  const nav = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [newNickName, setNewNickName] = useState("");
  const [isDuplicated, setIsDuplicated] = useState(false);
  const [isAvailableLength, setAvailableLength] = useState(true);
  const [isAvailableWord, setAvailableWord] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  /*
      입력 유효성 확인
      1. 입력 형식 확인
      2. 문자 길이 확인
      3. 중복 확인
    */
  const handleNickNameChange = (e) => {
    const value = e.target.value;
    setNewNickName(value);
    setAvailableWord(checkAvailableWord(value));
    setAvailableLength(checkWordLength(value, 20));
  };

  const submitNewNickName = async () => {
    const data = { nickname: newNickName };
    const response = await userApi.put(`/nickname`, data);
    dispatch(setNickName(response.data.nickname));
    nav("/mypage");
  };

  useEffect(() => {
    if (isAvailableLength && isAvailableWord) {
      const checkIsDuplicated = async (name) => {
        const response = await userApi.get(`/find?nickname=${name}`);
        
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
    }
  }, [isFocused, newNickName, isAvailableLength, isAvailableWord]);

  return (
    <div className="change-nick-name-container">
      <div className="change-nick-name-header">
        <MainHeader title="닉네임 변경" />
      </div>
      <div className="change-nick-name-main-content">
        <input
          type="text"
          value={newNickName}
          onChange={handleNickNameChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={user.nickName}
          className="nickname-input"
        />
        {!isDuplicated && isAvailableWord && 
        isAvailableLength && newNickName !== "" && (
          <div>
            <p>사용 가능한 닉네임입니다.</p>
          </div>
        )}
        {newNickName === "" && (
          <div>
            <p>닉네임을 입력해주세요</p>
          </div>
        )}
        {isDuplicated && (
          <div>
            <p>이미 존재하는 닉네임입니다.</p>
          </div>
        )}
        {!isAvailableWord && newNickName !== "" && (
          <div>
            <p> 입력 형식이 올바르지 않습니다. </p>
          </div>
        )}
        {!isAvailableLength && newNickName !== "" && (
          <div>
            <p>한글 10자 영어 20자 이내만 가능합니다. </p>
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
  );
};

export default ChangeNickName;
