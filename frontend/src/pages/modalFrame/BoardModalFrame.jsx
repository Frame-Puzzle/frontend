import "./BoardModalFrame.css";
import ChooseImg from "../../components/modal/board/ChooseImg";
import CreateWaitingRoom from "../../components/modal/game/CreateWaitingRoom";
import EnterWaitingRoom from "../../components/modal/game/EnterWaitingRoom";

const BoardModalFrame = ({ modalType, setModal }) => {
  return (
    <div className="board-modal flex justify-content-center align-items-center">
      {modalType === 1 ? <ChooseImg /> : null}
      {modalType === 2 ? <CreateWaitingRoom setModal={setModal} /> : null}
      {modalType === 3 ? <EnterWaitingRoom setModal={setModal} /> : null}
    </div>
  );
};

export default BoardModalFrame;
