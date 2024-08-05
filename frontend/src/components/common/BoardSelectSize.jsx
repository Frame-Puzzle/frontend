import { useDispatch } from "react-redux";
import "./BoardSelectSize.css";
import { setBoardSize } from "../../stores/createBoardSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Create Board의 첫 번째 전환 컴포넌트
const BoardSelectSize = () => {

  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [activate, setActivate] = useState(false);

  return (
    <div className="board-select-size w-full h-full">
      <div className="board-select-size-progress flex">
        <span>1</span>
        <span>2</span>
      </div>
      <div className="board-select-size-title">
        <span>퍼즐 판의 크기를</span>
        <span>설정해 주세요.</span>
      </div>
      <div className="board-select-size-button">
        <span onClick={() => {
          dispatch(setBoardSize(12));
          setActivate(true);
        }}>3X4</span>
        <span onClick={() => {
          dispatch(setBoardSize(20));
          setActivate(true);
        }}>4X5</span>
        <span onClick={() => {
          dispatch(setBoardSize(30));
          setActivate(true);
        }}>5X6</span>
      </div>
      <div className="board-select-size-next">
        { activate ? <span id="board-select-size-next-activate" onClick={() => {
          navigate(`/create-board/mission-on`);
        }}>다음</span> : null }
        <span>다음</span>
      </div>
    </div>
  )
}

export default BoardSelectSize;