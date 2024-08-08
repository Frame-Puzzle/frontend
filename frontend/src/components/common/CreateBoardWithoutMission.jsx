import { useSelector } from "react-redux";
import "./CreateBoardWithoutMission.css";
import directoryApi from "../../apis/directoryApi";
import { useNavigate } from "react-router-dom";

const CreateBoardWithoutMission = () => {

  // 퍼즐판 상세 페이지로 라우트 하기 위한 훅
  let navigate = useNavigate();

  // 퍼즐판 생성 요청 시 반드시 필요한 재료 준비
  let boardSize = useSelector(state => state.createBoard.boardSize);
  let directoryId = useSelector(state => state.createBoard.directoryId);

  // 백에게 퍼즐판(Board) 생성 요청을 하고, 퍼즐판 고유 번호를 받아오는 함수 정의
  const postBoards = async (boardSize, directoryId) => {
    try {
      // Request Body 데이터 가공
      const requestData = {
        guide: [],
        keyword: [],
        boardSize: boardSize
      };
      // 백엔드에 POST 요청을 보내기
      const response = await directoryApi.post(`/${directoryId}/boards`, requestData);
      // 응답 데이터에서 퍼즐판 고유 번호를 반환
      return response.data.data.boardId;
    } catch (error) {
      console.error('Error posting boards', error);
      throw error;
    }
  }

  return (
    <div className="create-board-without-mission w-full flex">
      <span onClick={() => {
        // 퍼즐판 생성 API
        const asyncPostBoards = async (boardSize, directoryId) => {
          const boardId = await postBoards(boardSize, directoryId);
          // 퍼즐판 고유 번호를 이용하여 퍼즐판 상세 페이지로 라우팅하기
          navigate(`/boards/${boardId}`);
        }
        // 실제로 호출하기
        asyncPostBoards(boardSize, directoryId);
      }}>퍼즐판 생성하기</span>
    </div>
  )
}

export default CreateBoardWithoutMission;