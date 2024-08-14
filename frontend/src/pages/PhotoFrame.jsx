import "./PhotoFrame.css";
import MainHeader from "../components/common/MainHeader";
import FrameSwipe from "../components/frame/FrameSwipe";
import { useEffect, useRef, useState } from "react";
import InputFrameImg from "../components/common/InputFrameImg";
import PhotoFrameModalFrame from "./modalFrame/PhotoFrameModalFrame";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas-pro";
import LoadingModal from "./LoadingModal";

const PhotoFrame = () => {
  const [selectFrame, setSelectFrame] = useState(0);
  const { boardID } = useParams();

  const [imgUrls, setImgUrls] = useState([
    "https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/Rectangle+6019.png",
    "https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/Rectangle+6019.png",
    "https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/Rectangle+6019.png",
    "https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/Rectangle+6019.png",
  ]);

  const [slotNum, setSlotNum] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isIconVisible, setIsIconVisible] = useState([true, true, true, true]);
  const inputFrameImgRef = useRef(null);

  const downloadPhotoFrame = () => {
    if (inputFrameImgRef.current) {
      const selectedFrameElement = document.querySelector(".selected-frame");
      if (selectedFrameElement) {
        selectedFrameElement.style.position = "relative";
      }
      html2canvas(inputFrameImgRef.current, {
        useCORS: true,
        backgroundColor: "white", // 투명 배경으로 설정
        scale: 4,
      })
        .then((canvas) => {
          if (selectedFrameElement) {
            selectedFrameElement.style.position = "";
          }

          const dataUrl = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "photo-frame.png";
          link.click();
          setLoading(false);
        })
        .catch((error) => {
          console.error("oops, something went wrong!", error);
        });
    }
  };

  useEffect(() => {
    if (loading) {
      downloadPhotoFrame();
    }
  }, [loading]);

  return (
    <div className="w-full h-full flex flex-wrap relative">
      {loading ? <LoadingModal /> : null}
      {slotNum !== 0 ? (
        <PhotoFrameModalFrame
          id={boardID}
          slotNum={slotNum}
          setSlotNum={setSlotNum}
          setImgUrls={setImgUrls}
          imgUrls={imgUrls}
          setIsIconVisible={setIsIconVisible}
          isIconVisible={isIconVisible}
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
          page="포토프레임"
          setLoading={setLoading}
        />
      </div>

      <div className="photo-frame-body">
        <div className="photo-capture" ref={inputFrameImgRef}>
          <img
            className="selected-frame"
            src={frames[selectFrame].src}
            alt={frames[selectFrame].type}
          />
          <InputFrameImg
            imageUrls={imgUrls}
            isIconVisible={isIconVisible}
            setSlotNum={setSlotNum}
          />
        </div>
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
