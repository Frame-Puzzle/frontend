import "./ProfileCircle.css";
import React, { useRef, useState } from "react";

const ProfileCircle = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div
        className="profile-circle"
        style={{
          backgroundImage: imageSrc ? `url(${imageSrc})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {imageSrc ? "" : "동그라미"}
      </div>
      <img
        src="/img/camera-logo.png"
        alt="camera-logo"
        onClick={handleClick}
        style={{ cursor: "pointer", width: "5%" }}
      />

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </>
  );
};

export default ProfileCircle;
