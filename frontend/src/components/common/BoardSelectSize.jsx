import { useDispatch } from "react-redux";
import "./BoardSelectSize.css";
import { setBoardSize } from "../../stores/createBoardSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Create Board의 첫 번째 전환 컴포넌트
const BoardSelectSize = () => {

  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [activate, setActivate] = useState(false);
  
  let [whatSize, setWhatSize] = useState(0);
  let [twelve, setTwelve] = useState('');
  let [twenty, setTwenty] = useState('');
  let [thirty, setThirty] = useState('');

  useEffect(() => {
    if (whatSize === 12) {
      setTwelve('checked');
    } else if (whatSize === 20) {
      setTwenty('checked');
    } else if (whatSize === 30) {
      setThirty('checked');
    }
    return () => {
      setTwelve('');
      setTwenty('');
      setThirty('');
    }
  }, [whatSize])

  return (
    <div className="board-select-size w-full h-full">
      <div className="board-select-size-progress flex">
        <span>1</span>
        <span>2</span>
      </div>
      <div className="board-select-size-title">
        <span>퍼즐 판의 크기를</span>
        <span>설정해 주세요</span>
      </div>
      <div className="board-select-size-button flex">
        <span id={twelve} onClick={() => {
          dispatch(setBoardSize(12));
          setActivate(true);
          setWhatSize(12);
        }}>3 X 4</span>
        <span id={twenty} onClick={() => {
          dispatch(setBoardSize(20));
          setActivate(true);
          setWhatSize(20);
        }}>4 X 5</span>
        <span id={thirty} onClick={() => {
          dispatch(setBoardSize(30));
          setActivate(true);
          setWhatSize(30);
        }}>5 X 6</span>
      </div>
      <div className="board-select-size-next flex">
        { activate ? <span id="board-select-size-next-activate" onClick={() => {
          navigate(`/create-board/mission-on`);
        }}>다음</span> : null }
        <span>다음</span>
      </div>
    </div>
  )
}

export default BoardSelectSize;