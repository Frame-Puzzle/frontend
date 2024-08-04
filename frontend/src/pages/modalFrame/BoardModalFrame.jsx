import './BoardModalFrame.css';
import ChooseImg from '../../components/modal/board/ChooseImg';

const BoardModalFrame = ({setModal, modalData}) => {

  return (
    <div className="choose-img-modal flex justify-content-center align-items-center">
      <ChooseImg setModal={setModal} modalData = {modalData}/>
    </div>
  )
}

export default BoardModalFrame; 