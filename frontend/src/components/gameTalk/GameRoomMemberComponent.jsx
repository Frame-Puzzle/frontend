import { useEffect, useState } from "react";
import "./GameRoomMemberComponent.css";
import OvAudioComponent from "./OvAudioComponent";

const GameRoomMemberComponent = ({ rtcUsers, gameUsers }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log("RTC Users Updated:", rtcUsers);
    console.log("Game Users:", gameUsers);

    if (gameUsers && gameUsers.userList) {
      const mergedUsers = gameUsers.userList.map((user) => {
        const matchedUser = rtcUsers.find((u) => u.name === user.nickname);
        console.log("matchedUser", matchedUser);

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
      console.log("Merged Users:", mergedUsers);
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
