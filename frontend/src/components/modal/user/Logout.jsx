import { useDispatch } from "react-redux";
import "./Logout.css";
import { setAccessToken } from "../../../stores/userSlice";
import { useNavigate } from "react-router-dom";

const Logout = ({ setModalFrame }) => {

  let dispatch = useDispatch();
  let navigate = useNavigate();

  return (
    <div className="logout-modal">
      <div className="logout-modal-body">
        <span>접속 중인 기기에서</span>
        <span>로그아웃하시겠습니까?</span>
      </div>
      <div className="logout-modal-footer flex">
        <div className="logout-modal-button" onClick={() => { setModalFrame(false); }}>취소</div>
        <div className="logout-modal-button" onClick={() => {
          dispatch(setAccessToken(""));
          localStorage.clear();
          navigate('/');
        }}>확인</div>
      </div>
    </div>
  )
}

export default Logout;