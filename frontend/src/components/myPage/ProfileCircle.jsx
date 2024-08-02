import "./ProfileCircle.css";
import React, { useRef, useState, useEffect } from "react";
import userApi from "../../apis/userApi";
import { useSelector, useDispatch } from "react-redux";
import { setProfileImg } from "../../stores/userSlice";

const ProfileCircle = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [profileSrc, setProfileSrc] = useState(null);

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      // 백으로 데이터 전달
      const formData = new FormData();
      formData.append("profileImg", file);

      const response = await userApi.put("/profile-img", formData);
      dispatch(setProfileImg(response.data.data.profileImg));
    }
  };

  useEffect(() => {
    setProfileSrc(user.profileImg);
  }, [user.profileImg]);

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
