import './BoardModalFrame.css';
import ChooseImg from '../../components/modal/board/ChooseImg';

const BoardModalFrame = ({setModal}) => {

  return (
    <div className="choose-img-modal flex justify-content-center align-items-center">
      <ChooseImg setModal={setModal}/>
    </div>
  )
}

export default BoardModalFrame;  