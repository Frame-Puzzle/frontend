import "./SelectPhoto.css";
import { useEffect, useState } from "react";
import boardApi from "./../../apis/boardApi";

const SelectPhoto = ({ id, setSlotNum, imgUrls, setImgUrls, slotNum }) => {
  const [imgList, setImgList] = useState([]);
  const [selectImg, setSelectImg] = useState(-1);

  useEffect(() => {
    const fetchAllImages = async () => {
      const response = await boardApi.get(`/${id}/images`);
      const data = response.data.data;

      setImgList(data.imgList);
    };

    fetchAllImages();
  }, []);

  const rows = [];
  for (let i = 0; i < imgList.length; i += 2) {
    rows.push(imgList.slice(i, i + 2));
  }

  const setImgFrame = () => {
    const newImgUrl = [...imgUrls];
    newImgUrl[slotNum - 1] = imgList[selectImg].imgUrl;
    setImgUrls(newImgUrl);
    setSlotNum(0);
  };

  return (
    <div className="select-photo-modal flex flex-wrap">
      <div className="select-photo-modal-header">
        <img
          src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/edit-image-photo.png"
          alt="edit-icon"
          className="select-photo-edit-icon"
        />
        <span className="select-photo-title">사진 선택</span>
        <img
          src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/x-symbol.png"
          alt="x-symbol"
          className="x-symbol"
          onClick={() => {
            setSlotNum(0);
          }}
        />
      </div>
      <div className="result-photo-modal-body">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="result-photo-row">
            {row.map((imgSrc, colIndex) => (
              <div
                key={colIndex}
                className="photo-container"
                onClick={() => setSelectImg(rowIndex * 2 + colIndex)}
                style={{
                  borderColor:
                    selectImg === rowIndex * 2 + colIndex
                      ? "#c3c7f4"
                      : "#F6F6F6",
                }}
              >
                <img
                  className="photo-img"
                  src={imgSrc.imgUrl}
                  alt={`img-${rowIndex}-${colIndex}`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <button
        className="result-photo-button"
        disabled={selectImg === -1}
        onClick={setImgFrame}
      >
        선택하기
      </button>
    </div>
  );
};

export default SelectPhoto;
