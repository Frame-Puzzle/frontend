import "./PhotoFrameModalFrame.css";
import SelectPhoto from "../../components/modal/SelectPhoto";
import { useEffect } from "react";

const PhotoFrameModalFrame = ({
  id,
  setSlotNum,
  setImgUrls,
  slotNum,
  imgUrls,
}) => {
  return (
    <div className="photo-frame-modal-frame flex justify-content-center align-items-center">
      <SelectPhoto
        id={id}
        setSlotNum={setSlotNum}
        setImgUrls={setImgUrls}
        slotNum={slotNum}
        imgUrls={imgUrls}
      />
    </div>
  );
};

export default PhotoFrameModalFrame;
