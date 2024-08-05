import { useNavigate } from "react-router-dom";
import "./Directory.css";

const Directory = (props) => {

  let navigate = useNavigate();

  return (
    <div className="directory" onClick={() => {
      navigate(`/directories/${props.info.directoryId}`);
    }}>
      <div className="directory-icon">
        <img src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/directory-folder.png" alt="directory-icon"></img>
      </div>
      <div className="directory-category-box">
        <span className="directory-category">{ /* category data binding */ props.info.category }</span>
      </div>
      <div className="directory-name-box">
        <span className="directory-name">{ /* directory name data binding */ props.info.directoryName }</span>
      </div>
    </div>
  )
}

export default Directory;