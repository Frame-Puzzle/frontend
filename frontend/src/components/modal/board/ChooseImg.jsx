import react, { useState, useRef, useEffect } from "react";
import paper from "paper";
import { setTileId } from "../../../stores/tileSlice";
import "./ChooseImg.css";
import { useSelector, useDispatch } from "react-redux";

const ChooseImg = ({ setModal }) => {
  const canvasRef = useRef(null);
  const tile = useSelector((state) => state.tile);
  const dispatch = useDispatch();

  const [imgSrc, setImgSrc] = useState(null);
  const [imgText, setImgText] = useState("");
  const [mission, setMission] = useState("");
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImgText = (e) => {
    const value = e.target.value;
    setImgText(value);
    // 255 byte이상 입력 경우 제한
  };

  useEffect(() => {
    paper.setup(canvasRef.current);

    return () => {};
  }, []);

  return (
    <div className="create-board-modal">
      <div className="create-board-modal-header flex">
        <img
          src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/x-symbol.png"
          alt="x-symbol"
          className="x-symbol"
          onClick={() => {
            dispatch(setTileId(0));
          }}
        />
      </div>
      <div className="create-choose-img-modal-body">
        <div className="mission-container"></div>
        <div className="uploading-img" onClick={handleClick}>
          {imgSrc ? (
            <img src={imgSrc} alt="new-img" className="uploaded-img" />
          ) : (
            <div className="choose-img-container">
              <img
                className="choose-img"
                src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/edit-image-photo.png"
                alt="edit-image-photo"
              />
              <span>Upload Photos</span>
            </div>
          )}
        </div>

        <input
          type="file"
          accept="image/jpeg,image/png,image/gif"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <div className="image-description">
          <span>덧붙이고 싶은 설명을 적어주세요.</span>
          <input type="text" value={imgText} onChange={handleImgText} />
        </div>
      </div>

      <div className="choose-img-buttons">
        <button>등록</button>
      </div>
    </div>
  );
};

export default ChooseImg;
