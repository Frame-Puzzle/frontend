import "./PhotoFrame.css";
import MainHeader from "../components/common/MainHeader";
import FrameSwipe from "../components/frame/FrameSwipe";
import { useState } from "react";
import InputFrameImg from "../components/common/InputFrameImg";
import PhotoFrameModalFrame from "./modalFrame/PhotoFrameModalFrame";
import { useParams } from "react-router-dom";

const PhotoFrame = () => {
  const [selectFrame, setSelectFrame] = useState(0);
  const { boardID } = useParams();

  const [imgUrls, setImgUrls] = useState([
    "https://frazzle208.s3.ap-northeast-2.amazonaws.com/download.jpg",
    "https://frazzle208.s3.ap-northeast-2.amazonaws.com/bCmE_8XrnEYeEKlbme2ZS8rsG6dcB1vGD-UJtxvGncvXuYL9fiBqL8Fk_6cQ58EKJYTyyw9mA0LWK3yIaRYQow.webp",
    "https://frazzle208.s3.ap-northeast-2.amazonaws.com/70a62f92-5072-4605-bc37-d72817347a7d",
    "https://frazzle208.s3.ap-northeast-2.amazonaws.com/202306070834291810_1.jpg",
  ]);
  const [slotNum, setSlotNum] = useState(0);

  return (
    <div className="w-full h-full flex flex-wrap relative">
      {slotNum !== 0 ? (
        <PhotoFrameModalFrame
          id={boardID}
          slotNum={slotNum}
          setSlotNum={setSlotNum}
          setImgUrls={setImgUrls}
          imgUrls={imgUrls}
        />
      ) : null}
      <div className="photo-frame-header">
        <MainHeader
          title={"PhotoFrame"}
          icon={
            <img
              src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/download.png"
              alt="thirdIcon"
              className="header-icon"
              style={{ width: "38%", marginLeft: "7vw" }}
            />
          }
        />
      </div>
      <div className="photo-frame-body">
        <InputFrameImg
          imageUrls={imgUrls}
          setImgUrls={setImgUrls}
          slotNum={slotNum}
          setSlotNum={setSlotNum}
        />
        <img
          className="selected-frame"
          src={frames[selectFrame].src}
          alt={frames[selectFrame].type}
        />
      </div>
      <div className="photo-frame-footer">
        <FrameSwipe frames={frames} setSelectFrame={setSelectFrame} />
      </div>
    </div>
  );
};

const frames = [
  {
    src: "https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/%ED%94%84%EB%A0%88%EC%A6%90+%ED%94%84%EB%A0%88%EC%9E%841.png",
    type: "black",
  },
  {
    src: "https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/%ED%94%84%EB%A0%88%EC%A6%90+%ED%94%84%EB%A0%88%EC%9E%842.png",
    type: "white-black",
  },
  {
    src: "https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/%ED%94%84%EB%A0%88%EC%A6%90+%ED%94%84%EB%A0%88%EC%9E%843.png",
    type: "white-purple",
  },
  {
    src: "https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/%ED%94%84%EB%A0%88%EC%A6%90+%ED%94%84%EB%A0%88%EC%9E%844.png",
    type: "purple",
  },
  {
    src: "https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/%ED%94%84%EB%A0%88%EC%A6%90+%ED%94%84%EB%A0%88%EC%9E%845.png",
    type: "pick",
  },
  {
    src: "https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/%ED%94%84%EB%A0%88%EC%A6%90+%ED%94%84%EB%A0%88%EC%9E%846.png",
    type: "hot-pick",
  },
];

export default PhotoFrame;
