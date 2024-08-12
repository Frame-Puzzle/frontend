import "./GameModalFrame.css";

const GameModalFrame = ({ isModal,setModal}) => {

  return (
    <div className="game-modal-frame flex justify-content-center align-items-center">
      {isModal ? <EndGame /> : null}
    </div>
  );
};

export default GameModalFrame;
