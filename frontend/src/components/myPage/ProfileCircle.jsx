import "./ProfileCircle.css";
import React, { useRef, useState } from "react";

const ProfileCircle = () => {
  const [profileSrc, setProfileSrc] = useState(null);
  const [logoSrc, setLogoSrc] = useState(false);

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div
        className="profile-circle"
        style={{
          backgroundImage: profileSrc ? `url(${profileSrc})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {profileSrc ? "" : "동그라미"}
      </div>
      <img
        src="/img/camera-logo.png"
        alt="camera-logo"
        onClick={() => setLogoSrc(true)}
        style={{ cursor: "pointer", width: "5%" }}
      />

      {logoSrc && (
        <div className="image-library" onClick={handleClick}>
          <p> 사진 보관함</p>
          <img
            src="/img/image-logo.png"
            alt="image-logo"
            style={{ cursor: "pointer", width: "20%", height: "20%" }}
          />
        </div>
      )}

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
