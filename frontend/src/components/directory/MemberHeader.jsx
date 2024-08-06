import "./MemberHeader.css";
import Profile from "../common/Profile";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// 3요소: 해당 페이지 이름, 해당 페이지 카테고리, 아이콘 (없을 수도 있음)
const MemberHeader = ({ memberList }) => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    console.log(memberList);
    if (memberList.length !== 0) setMembers(memberList);
    else setMembers([]);
  }, [memberList]);

  return (
    <div className="member-header flex"> 
      <div className="member-header-left">
        <img
          src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/invite-member.png"
          alt="invite-member"
          className="member-header-logo"
        />
        <span className="member-header-comment">멤버</span>
      </div>
      <div className="member-header-middle">
        {members.map((member, index) => (
          <Profile
            key={index}
            imgUrl={member.profileUrl}
            userName={member.nickname}
          />
        ))}
      </div>

      <div className="member-header-right">
        <img
          src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/exit.png"
          alt="exit-directory"
          className="member-header-logo"
        />
        <span className="member-header-comment">탈퇴하기</span>
      </div>
    </div>
  );
};

export default MemberHeader;
