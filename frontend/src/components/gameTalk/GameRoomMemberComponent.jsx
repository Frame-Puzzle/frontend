import { useEffect, useState } from "react";
import "./GameRoomMemberComponent.css";
import OvAudioComponent from "./OvAudioComponent";

const GameRoomMemberComponent = ({ rtcUsers, gameUsers }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {

    if (gameUsers && gameUsers.userList) {
      const mergedUsers = gameUsers.userList.map((user) => {
        const matchedUser = rtcUsers.find((u) => u.name === user.nickname);

        return {
          ...user,
          ...(matchedUser || {}),
          profileUrl: matchedUser ? matchedUser.profileUrl : user.profileImg,
          name: user.nickname,
          isSpeaking: matchedUser ? matchedUser.isSpeaking : false,
          streamManager: matchedUser ? matchedUser.streamManager : undefined,
        };
      });

      setUsers(mergedUsers);

    }
  }, [rtcUsers, gameUsers]);

  return (
    <div className="game-room-member-header flex">
      {users.map((user, index) => (
        <div key={index} className={"game-room-member-container"}>
          <div
            className={`game-room-member-profile-circle ${
              user.isSpeaking ? "speaking" : ""
            }`}
            style={{
              backgroundImage: `url(${user.profileUrl})`,
            }}
          ></div>

          <span className="game-room-member-nickname">{user.name}</span>
          {user.streamManager && (
            <OvAudioComponent streamManager={user.streamManager} />
          )}
        </div>
      ))}
    </div>
  );
};

export default GameRoomMemberComponent;
