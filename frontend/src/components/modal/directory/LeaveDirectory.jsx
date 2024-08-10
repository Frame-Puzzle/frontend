import "./LeaveDirectory.css";
import { useNavigate, useParams } from "react-router-dom";
import directoryApi from "../../../apis/directoryApi";
import { setModalId } from "../../../stores/directorySlice";
import { useDispatch } from "react-redux";

const LeaveDirectory = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const dispatch = useDispatch();

  const leaveDirectory = async () => {
    const response = await directoryApi.delete(`/${id}`);
    nav("/home");
  };
  return (
    <div className="leave-directory-modal flex flex-wrap">
      <div className="leave-directory-modal-header flex">
        <span>디렉토리를 나가시겠습니까?</span>
      </div>
      <div className="leave-directory-modal-body">
        <span>
          확인 버튼 클릭 시 디렉토리에서 나가게 되며 다시 초대받기 전까지 접근할
          수 없습니다.
        </span>
      </div>
      <div className="leave-directory-modal-footer">
        <div
          className="leave-directory-button"
          onClick={() => dispatch(setModalId(0))}
        >
          취소
        </div>
        <div className="leave-directory-button" onClick={leaveDirectory}>
          확인
        </div>
      </div>
    </div>
  );
};

export default LeaveDirectory;
