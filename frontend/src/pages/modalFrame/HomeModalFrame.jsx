import './HomeModalFrame.css';
import CreateDirectory from "./../../components/modal/directory/CreateDirectory";

const HomeModalFrame = (props) => {

  //if (){}

  return (
    <div className="home-modal flex justify-content-center align-items-center">
      <CreateDirectory setModal={props.setModal} />
    </div>
  )
}

export default HomeModalFrame;