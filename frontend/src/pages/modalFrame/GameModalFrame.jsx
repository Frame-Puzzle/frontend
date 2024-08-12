import "./GameModalFrame.css";
import ResultGame from "../../components/modal/game/ResultGame";

const GameModalFrame = ({ winner }) => {
  return (
    <div className="game-modal-frame flex justify-content-center align-items-center">
      {winner ? <ResultGame winner={winner} /> : null}
    </div>
  );
};

export default GameModalFrame;
