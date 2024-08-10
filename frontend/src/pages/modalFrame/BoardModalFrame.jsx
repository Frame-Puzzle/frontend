import "./BoardModalFrame.css";
import ChooseImg from "../../components/modal/board/ChooseImg";
import CreateWaitingRoom from "../../components/modal/game/CreateWaitingRoom";
import EnterWaitingRoom from "../../components/modal/game/EnterWaitingRoom";
import DeleteBoard from "../../components/modal/board/DeleteBoard";

import { useSelector } from "react-redux";
import { useEffect } from "react";

const BoardModalFrame = () => {
  const board = useSelector((state) => state.board);



  return (
    <div className="board-modal flex justify-content-center align-items-center">
      {board.modalId === 1 ? <ChooseImg /> : null}
      {board.modalId === 2 ? <CreateWaitingRoom /> : null}
      {board.modalId === 3 ? <EnterWaitingRoom /> : null}
      {board.modalId === 4 ? <DeleteBoard /> : null}
    </div>
  );
};

export default BoardModalFrame;
