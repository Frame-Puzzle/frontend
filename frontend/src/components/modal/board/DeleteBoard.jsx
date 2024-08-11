import "./DeleteBoard.css";
import boardApi from "../../../apis/boardApi";
import { setVote } from "../../../stores/boardSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setModalId } from "../../../stores/boardSlice";

const DeleteBoard = () => {
  const dispatch = useDispatch();
  const { boardID } = useParams();

  const deleteBoard = async () => {
    const data = {
      accept: true, 
    };

    const response = await boardApi.put(`/${boardID}/vote`, data);
    dispatch(setVote(true));
    dispatch(setModalId(0));
  };
  return (
    <div className="delete-board-modal flex flex-wrap">
      <div className="delete-board-modal-header flex">
        <span>퍼즐판을 삭제하겠습니까?</span>
      </div>
      <div className="delete-board-modal-body">
        <span>
          삭제 버튼 클릭 시 투표가 시작되며, 모든 멤버의 동의를 얻어야
          삭제됩니다.
        </span>
      </div>
      <div className="delete-board-modal-footer">
        <div
          className="delete-board-button"
          onClick={() => dispatch(setModalId(0))}
        >
          취소
        </div>
        <div className="delete-board-button" onClick={deleteBoard}>
          확인
        </div>
      </div>
    </div>
  );
};

export default DeleteBoard;
