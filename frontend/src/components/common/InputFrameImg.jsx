import React, { useEffect, useState } from "react";
import "./InputFrameImg.css";

const InputFrameImg = ({ imageUrls, setImgUrls, slotNum, setSlotNum }) => {
  return (
    <div className="input-frame-container">
      <div className="frame-slot top-left">
        <img src={imageUrls[0]} alt="slot1" />
        <div className="click-overlay" onClick={() => setSlotNum(1)} />
      </div>
      <div className="frame-slot top-right">
        <img src={imageUrls[1]} alt="slot2" />
        <div className="click-overlay" onClick={() => setSlotNum(2)} />
      </div>
      <div className="frame-slot bottom-left">
        <img src={imageUrls[2]} alt="slot3" />
        <div className="click-overlay" onClick={() => setSlotNum(3)} />
      </div>
      <div className="frame-slot bottom-right">
        <img src={imageUrls[3]} alt="slot4" />
        <div className="click-overlay" onClick={() => setSlotNum(4)} />
      </div>
    </div>
  );
};

export default InputFrameImg;
