import "./InviteDirectory.css";
import { useDispatch, useSelector } from "react-redux";
import { setModalId } from "../../../stores/directorySlice";
import { useEffect, useState } from "react";

const InviteDirectory = () => {
  const dispatch = useDispatch();
  const directory = useSelector((state) => state.directory);
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    setMemberList(directory.memberList);
  }, [directory.memberList]);

  return (
    <div className="invite-directory-modal flex flex-wrap">
      <div className="invite-directory-modal-header flex">
        <img
          src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/invite-member.png"
          alt="folder-icon"
          className="folder-icon"
        />
        <span className="create-directory-modal-title">디렉토리 멤버 초대</span>
        <img
          src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/x-symbol.png"
          alt="x-symbol"
          className="x-symbol"
          onClick={() => {
            dispatch(setModalId(0));
          }}
        />
      </div>
      <div className="invite-directory-modal-body">
        <div className="email-input-container">
          <span>초대하고 싶은 멤버의 이메일을 입력하세요</span>
          <div>
            <input type="email" />
            <button>초대</button>
          </div>
        </div>
        <div className="members-container">
          <span>멤버</span>
        </div>
      </div>
    </div>
  );
};

export default InviteDirectory;
