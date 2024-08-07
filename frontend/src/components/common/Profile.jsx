import "./Profile.css";
import React, { useRef, useState, useEffect } from "react";
import makeNickNameShort from "../../utils/makeNickNameShort";

const Profile = ({ imgUrl, userName}) => {
  const [profileImgUrl, setProfileImgUrl] = useState(
    "https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/profile-default.png"
  );
  const [profileName, setProfileName] = useState(true);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if(imgUrl !== null) setProfileImgUrl(imgUrl);
    setProfileName(makeNickNameShort(userName));
  }, [imgUrl, userName]);

  return (
    <>
      <div className="profile-container">
        <div
          className="profile-circle"
          style={{
            backgroundImage: `url(${profileImgUrl})`,
          }}
        ></div>
        <span>{profileName}</span>
      </div>
    </>
  );
};

export default Profile;
