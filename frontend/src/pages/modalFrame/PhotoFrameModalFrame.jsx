import "./PhotoFrameModalFrame.css";
import SelectPhoto from "../../components/modal/SelectPhoto";
import { useEffect } from "react";

const PhotoFrameModalFrame = ({
  id,
  setSlotNum,
  setImgUrls,
  slotNum,
  imgUrls,
  setThumbnailModal,
  setTnTrigger,
  setIsIconVisible,
  isIconVisible,
}) => {
  useEffect(() => {
    if (setTnTrigger) {
      setTnTrigger(0);
    }
  }, []);

  return (
    <div className="photo-frame-modal-frame flex justify-content-center align-items-center">
      {setSlotNum && setImgUrls && slotNum && imgUrls ? (
        <SelectPhoto
          id={id}
          setSlotNum={setSlotNum}
          setImgUrls={setImgUrls}
          slotNum={slotNum}
          imgUrls={imgUrls}
          setIsIconVisible={setIsIconVisible}
          isIconVisible={isIconVisible}
        />
      ) : (
        <SelectPhoto
          id={id}
          setThumbnailModal={setThumbnailModal}
          setTnTrigger={setTnTrigger}
        />
      )}
    </div>
  );
};

export default PhotoFrameModalFrame;
