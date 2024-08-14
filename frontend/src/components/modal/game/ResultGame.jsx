import { useEffect, useState } from "react";
import "./ResultGame.css";

const ResultGame = ({ winner }) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(formatTime(winner.time));
  }, []);

  return (
    <div className="result-game-modal flex flex-wrap">
      <div className="result-game-modal-header">
        <span className="result-game-header-sub">
          5초 후에 자동으로 이동합니다.
        </span>
        <span className="result-game-header-title">WINNER</span>
      </div>
      <div className="result-game-modal-body">
        <span className="result-game-winner-timer">{time}</span>
        <div className="result-game-winner-nickname">{winner.nickname}</div>
        <div className="result-game-winner-sub">
          <span><b>{winner.nickname}</b>님만</span>
          <span>썸네일을 수정할 수 있습니다.</span>
        </div>
      </div>
    </div>
  );
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}분 ${remainingSeconds}초`;
};

export default ResultGame;
