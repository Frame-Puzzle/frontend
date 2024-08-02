import "./CreateDirectory.css";
import SelectCategory from "../../common/SelectCategory";
import { useState } from "react";

const CreateDirectory = (props) => {

  let [directoryName, setDirectoryName] = useState('');

  return (
    <div className="create-directory-modal flex flex-wrap">
      <div className="create-directory-modal-header flex"> {/* 1. 20% */}
        <img src="/img/folder.png" alt="folder-icon" className="folder-icon" />
        <span className="create-directory-modal-title">디렉토리 만들기</span>
        <img src="/img/x-symbol.png" alt="x-symbol" className="x-symbol" onClick={() => {
          props.setModal(false);
        }} />
      </div>
      <div className="create-directory-modal-body"> {/* 1. 80% */}
        <div className="select-category-container"> {/* 2. 45% */}
          <div className="select-category-text"> {/* 3. 20% */}
            <span>누구와의 추억을 저장하고 싶나요?</span>
          </div>
          <div className="select-category-content flex"> {/* 3. 80% */}
            <SelectCategory category={"friend"} /> {/* 4. 25% */}
            <SelectCategory category={"family"} /> {/* 4. 25% */}
            <SelectCategory category={"lover"} /> {/* 4. 25% */}
            <SelectCategory category={"pet"} /> {/* 4. 25% */}
          </div>
        </div>
        <div className="input-directory-name"> {/* 2. 35% */}
          <span className="input-directory-name-text">디렉토리 이름을 설정해 주세요.</span>
          <input className="input-directory-name-input block" maxLength={20} onChange={(e) => {
            setDirectoryName(e.target.value);
          }} />
        </div>
        <div className="create-directory-button"> {/* 2. 20% */}

        </div>
      </div>
    </div>
  )
}

export default CreateDirectory;