import "./CreateDirectory.css";
import SelectCategory from "../../common/SelectCategory";
import { useEffect, useState } from "react";
import checkAvailableWord from "../../../utils/stringConfig/checkAvailableWord";
import chekcWordLength from "../../../utils/stringConfig/checkWordLength";
import directoryApi from "../../../apis/directoryApi";
import { useNavigate } from "react-router-dom";
import ExceptionMessage from "../../common/ExceptionMessage";

const CreateDirectory = (props) => {

  // 백에게 디렉토리 생성 요청을 하고, 고유 디렉토리 번호를 받아오는 함수 정의하기
  const postDirectories = async (directoryName, who) => {
    try {
      // Request Body 데이터 가공
      const requestData = {
        category: who,
        directoryName: directoryName
      };
      // 백엔드에 POST 요청을 보내기
      const response = await directoryApi.post(``, requestData);
      // 응답 데이터에서 고유 디렉토리 번호를 반환
      return response.data.data.directoryId;
    } catch (error) {
      console.error('Error posting directories', error);
      throw error;
    }
  }

  // 사용자의 input 저장
  let [directoryName, setDirectoryName] = useState('');
  // 1(유효하지 않은 형식), 2(길이 초과), 3(사용 가능). => 예외 동적 UI를 위한 state
  let [exceptionMessage, setExceptionMessage] = useState(0);
  // '만들기' 버튼 활성화를 위한 state
  let [activate, setActivate] = useState(false);
  // 누구와의 추억을 저장하고 싶나요? 질문에서 어떤 카테고리를 골랐는지에 대한 state
  let [who, setWho] = useState('');

  let navigate = useNavigate();

  useEffect(() => {

    if (directoryName === '') {
      setExceptionMessage(0);
    } else if (!checkAvailableWord(directoryName)) {
      setExceptionMessage(1);
    } else if (!chekcWordLength(directoryName, 32)) {
      setExceptionMessage(2);
    } else {
      setExceptionMessage(3);
    }

  }, [directoryName]);

  useEffect(() => {

    if ((exceptionMessage === 3) && (who !== '')) {
      // '만들기' 버튼 활성화
      setActivate(true);
    } else {
      // '만들기' 버튼 비활성화
      setActivate(false);
    }

  }, [exceptionMessage, who]);

  // setWho로 state 갈아치우는 것은 쉬워보이지만, css 효과를 부여하는 것이 어려워 보인다.
  // 다른 거 다 떼고, 클릭한 것만 붙여주기. 뭐를? border css 효과를.

  // 마지막에 Exception Message 띄우는 것(props로 state 넘겨서 동적으로 바뀌는 메시지)
  // 클릭하면 border css 주는 것을 하자. 우선은 만들기 버튼 활성화 시켜서 라우팅 시키는 것이 급함.

  return (
    <div className="create-directory-modal flex flex-wrap">
      <div className="create-directory-modal-header flex"> {/* 1. 20% */}
        <img src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/folder.png" alt="folder-icon" className="folder-icon" />
        <span className="create-directory-modal-title">디렉토리 만들기</span>
        <img src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/x-symbol.png" alt="x-symbol" className="x-symbol" onClick={() => {
          props.setModal(false);
        }} />
      </div>
      <div className="create-directory-modal-body"> {/* 1. 80% */}
        <div className="select-category-container"> {/* 2. 45% */}
          <div className="select-category-text"> {/* 3. 20% */}
            <span>누구와의 추억을 저장하고 싶나요?</span>
          </div>
          <div className="select-category-content flex"> {/* 3. 80% */}
            <SelectCategory category={"friend"} setWho={ setWho } /> {/* 4. 25% */}
            <SelectCategory category={"family"} setWho={ setWho } /> {/* 4. 25% */}
            <SelectCategory category={"lover"} setWho={ setWho } /> {/* 4. 25% */}
            <SelectCategory category={"pet"} setWho={ setWho } /> {/* 4. 25% */}
          </div>
        </div>
        <div className="input-directory-name"> {/* 2. 35% */}
          <div className="input-directory-name-text">
            <span>디렉토리 이름을 설정해 주세요.</span>
          </div>
          <input className="input-directory-name-input block" onChange={(e) => {
            setDirectoryName(e.target.value);
          }} />
          {/* 예외 메시지 동적 UI */}
          <ExceptionMessage exceptionMessage={exceptionMessage} />
        </div>
        <div className="create-directory-button relative"> {/* 2. 20% */}
          { activate ? <span id="active" onClick={() => {
            const postAndRoute = async (directoryName, who) => {
              const directoryId = await postDirectories(directoryName, who);
              // Route
              navigate(`/directories/${directoryId}`);
            }
            postAndRoute(directoryName, who);
          }}>만들기</span> : null }
          <span>만들기</span>
        </div>
      </div>
    </div>
  )
}

export default CreateDirectory;