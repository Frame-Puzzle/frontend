import react, { useState, useRef, useEffect } from "react";
import paper from "paper";
import { setTileId } from "../../../stores/tileSlice";
import "./ChooseImg.css";
import pieceApi from "../../../apis/pieceApi";
import { useSelector, useDispatch } from "react-redux";
import compressImage from "../../../utils/compressImg";

const ChooseImg = () => {
  const tile = useSelector((state) => state.tile);
  const dispatch = useDispatch();

  const [imgUrl, setImgUrl] = useState(null);
  const [imgText, setImgText] = useState("");
  const [imgFile, setImgFile] = useState(null);
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
        setImgUrl(reader.result);
      };
      reader.readAsDataURL(file);

      // 이미지 압축
      const compressedImage = await compressImage(file);
      setImgFile(compressedImage);
    }
  };

  const handleImgText = (e) => {
    const value = e.target.value;
    setImgText(value);
    // 255 byte이상 입력 경우 제한
  };


  useEffect(() => {
    // 퍼즐 조각 클릭 시 이벤트
    const fetchPiece = async () => {
      try {
        const response = await pieceApi.get(`${tile.tileId}`);
        setImgUrl(response.data.data.imgUrl);

        const comment = response.data.data.comment;
        if (comment) setImgText(comment);
      } catch (error) {
        console.error("Error fetching piece:", error);
      }
    };

    fetchPiece();

    return () => {};
  }, [tile.tileId]);

  const fetchSaveImg = async () => {
    // 사진이 없을 경우 에러 메시지 출력
    if (imgFile === null) return;
    const formData = new FormData();
    formData.append("imgFile", imgFile);
    //formData.append('comment', imgText);

    const data = {
      imgFile: formData,
      comment: imgText,
    };

    const response = await pieceApi.put(`${tile.tileId}`, data);
    console.log(response);
  };

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
          {imgUrl ? (
            <img src={imgUrl} alt="new-img" className="uploaded-img" />
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
        <button onClick={fetchSaveImg}>등록</button>
      </div>
    </div>
  );
};

export default ChooseImg;
