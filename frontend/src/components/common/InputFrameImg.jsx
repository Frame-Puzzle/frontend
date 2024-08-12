import React, { useState } from "react";
import "./InputFrameImg.css";

const InputFrameImg = ({ imageUrls, setImgUrls, slotNum, setSlotNum }) => {
  return (
    <div className="input-frame-container">
      <div className="frame-slot top-left">
        {imageUrls[0] ? (
          <img src={imageUrls[0]} alt="slot1" />
        ) : (
          <img className="hidden-img" alt="empty-slot1" />
        )}
      </div>
      <div className="frame-slot top-right">
        {imageUrls[1] ? (
          <img src={imageUrls[1]} alt="slot2" />
        ) : (
          <img className="hidden-img" alt="empty-slot2" />
        )}
      </div>
      <div className="frame-slot bottom-left">
        {imageUrls[2] ? (
          <img src={imageUrls[2]} alt="slot3" />
        ) : (
          <img className="hidden-img" alt="empty-slot3" />
        )}
      </div>
      <div className="frame-slot bottom-right">
        {imageUrls[3] ? (
          <img src={imageUrls[3]} alt="slot4" />
        ) : (
          <img className="hidden-img" alt="empty-slot4" />
        )}
      </div>
    </div>
  );
};

export default InputFrameImg;
