import { useEffect, useState } from "react";
import "./InputKeyword.css";
import KeywordPill from "./KeywordPill";
import isValidKoreanNumeric from "../../utils/stringConfig/isValidKoreanNumeric";
import KeywordExceptionMessage from "./KeywordExceptionMessage";

const InputKeyword = () => {

  // <input>과의 양방향 연결을 위한 State
  let [current, setCurrent] = useState('');
  // keyword 저장 공간
  let [keyword, setKeyword] = useState([]);
  // <input> 태그에 입력할 수 있도록 하는 장치
  let [isDisabled, setIsDisabled] = useState(false);
  // 예외 동적 메시지 UI를 조작하는 스위치 (0이면 null, 1이면 형식문제, 2면 중복문제, 3이면 OK)
  let [exceptionMessage, setExceptionMessage] = useState(0);
  // '미션 생성하기' 버튼 활성화 스위치
  let [activate, setActivate] = useState(false);

  // 사용자가 <input> 태그에서 Enter 또는 Spacebar를 눌렀을 때, 실행되어야 하는 작업들
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {

      // 한글과 숫자 합쳐서 공백없이 6자 이내인지 판별하는 조건식
      if (!isValidKoreanNumeric(current)) {
        return;
      }

      // 이미 keyword 저장 공간에 존재하는 키워드를 입력했는지를 판별하는 조건식
      if (keyword.includes(current)) {
        return;
      }

      // 사용자가 입력하는 기본 동작을 먼저 막고
      e.preventDefault();
      // 현재 <input>에 있는 값을 keyword 저장 공간에 추가하고
      let deepcopy = [...keyword]; // 얕은 복사 방지
      deepcopy.push(current);
      setKeyword(deepcopy);
      // 양방향 연결이 되어있는 current를 이용하여 State와 <input> 태그 전부 비우기
      setCurrent('');
    }
  }

  useEffect(() => {
    // 만약 입력한 keyword가 3개 이상이라면
    if (keyword.length >= 3) {
      // 사용자가 <input> 태그에 입력 자체를 못하게끔 설정
      setIsDisabled(true);
    } else {
      // 그게 아니라면 <input> 태그에 입력 가능하게끔 설정
      setIsDisabled(false);
    }

    // 만약 입력한 keyword가 최소한 하나라도 있으면
    if (keyword.length >= 1) {
      // '미션 생성하기' 버튼을 클릭 가능하도록 활성화
      setActivate(true);
    } else { // 그게 아니라면 '미션 생성하기' 버튼 비활성화
      setActivate(false);
    }
  }, [keyword]);

  useEffect(() => {

    if (current === '') {
      setExceptionMessage(0);
    } else if (!isValidKoreanNumeric(current)) { // 사용자가 실시간으로 <input>에 입력하고 있는 값이 형식에 맞지 않으면
      setExceptionMessage(1);
    } else if (keyword.includes(current)) { // 이미 keyword 저장 공간에 존재하는 키워드라면
      setExceptionMessage(2);
    } else { // 어디에도 해당되지 않으면 OK Sign
      setExceptionMessage(3);
    }

  }, [current, keyword]);

  return (
    <div className="input-keyword">
      <span>키워드 입력 (최대 3개)</span>
      <input
        className="input-keyword-input"
        value={current}
        onChange={(e) => { setCurrent(e.target.value); }}
        onKeyDown={handleKeyDown}
        disabled={isDisabled}>
      </input>
      {/* 예외 메시지 동적 UI */}
      <KeywordExceptionMessage exceptionMessage={exceptionMessage} />
      <div className="flex">
        {
          keyword.map((a, i) => {
            return (
              // a의 타입은 String
              <KeywordPill key={i} info={a} setKeyword={setKeyword} keyword={keyword} />
            )
          })
        }
      </div>
      {/* '미션 생성하기' 버튼 활성화 or 비활성화 */}
      <div className="input-keyword-next">
        { activate ? <span id="input-keyword-next-activate">미션 생성하기</span> : null }
        <span>미션 생성하기</span>
      </div>
    </div>
  )
}

export default InputKeyword;