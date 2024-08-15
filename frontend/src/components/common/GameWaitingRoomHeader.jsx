import React, { useEffect } from "react";
import Profile from "./Profile";
import "./GameWaitingRoomHeader.css";
import makeNickNameShort from "../../utils/makeNickNameShort";

const GameWaitingRoomHeader = ({ robyKing, robyUserList }) => {
  return (
    <div className="game-waiting-room-header flex">
      {robyKing ? (
        <div className="game-profile-container">
          <img
            className="king-icon"
            src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/king.png"
            alt="king"
          />
          <div
            className="game-profile-circle"
            style={{
              backgroundImage: `url(${robyKing.profileImg})`,
            }}
          ></div>
          <span className="game-profile-name">{robyKing.nickname}</span>
        </div>
      ) : null}
      {robyUserList.map((user, index) =>
        user.nickname !== robyKing.nickname ? (
          <div key={index} className="game-profile-container">
            <div
              className="game-profile-circle"
              style={{
                backgroundImage: `url(${user.profileImg})`,
              }}
            ></div>
            <span className="game-profile-name">{makeNickNameShort(user.nickname)}</span>
          </div>
        ) : null
      )}
    </div>
  );
};

export default GameWaitingRoomHeader;
