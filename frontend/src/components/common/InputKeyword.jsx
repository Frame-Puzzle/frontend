import { useEffect, useState } from "react";
import "./InputKeyword.css";

const InputKeyword = () => {

  // <input>과의 양방향 연결을 위한 State
  let [current, setCurrent] = useState('');
  // keyword 저장 공간
  let [keyword, setKeyword] = useState([]);
  // <input> 태그에 입력할 수 있도록 하는 장치
  let [isDisabled, setIsDisabled] = useState(false);

  // 사용자가 <input> 태그에서 Enter 또는 Spacebar를 눌렀을 때, 실행되어야 하는 작업들
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
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
  }, [keyword]);

  return (
    <div className="input-keyword">
      <span>키워드 입력 (최대 3개)</span>
      <input
        className="input-keyword-input"
        value={current}
        onChange={(e) => { setCurrent(e.target.value); }}
        onKeyDown={handleKeyDown}
        disabled={isDisabled}></input>
    </div>
  )
}

export default InputKeyword;