import "./DeleteUser.css";
import userApi from "../../../apis/userApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "../../../stores/userSlice";

const DeleteUser = ({ setModalFrame }) => {

  let dispatch = useDispatch();
  let navigate = useNavigate();

  return (
    <div className="delete-user-modal">
      <div className="delete-user-modal-body">
        <span>정말 탈퇴하시겠습니까?</span>
        <span>탈퇴하면 기존의 데이터가</span>
        <span>모두 사라지며 복구되지 않습니다.</span>
      </div>
      <div className="delete-user-modal-footer flex">
        <div className="delete-user-modal-button" onClick={() => { setModalFrame(false); }}>취소</div>
        <div className="delete-user-modal-button" onClick={() => {
          const asyncDelete = async () => {
            const response = await userApi.delete();
            dispatch(setAccessToken(""));
            localStorage.clear();
            navigate("/");
          }
          asyncDelete();
        }}>탈퇴</div>
      </div>
    </div>
  )
}

export default DeleteUser;