import DeleteUser from "../../components/modal/user/DeleteUser";
import Logout from "../../components/modal/user/Logout";
import "./MypageModalFrame.css";

const MypageModalFrame = ({ modal, setModalFrame }) => {
  return (
    <div className="mypage-modal-frame absolute w-full h-full">
      {/* 로그아웃 컴포넌트 끼우기 */}
      { modal === 1 ? <Logout setModalFrame={setModalFrame} /> : null }
      {/* 회원탈퇴 컴포넌트 끼우기 */}
      { modal === 2 ? <DeleteUser setModalFrame={setModalFrame} /> : null }
    </div>
  )
}

export default MypageModalFrame;