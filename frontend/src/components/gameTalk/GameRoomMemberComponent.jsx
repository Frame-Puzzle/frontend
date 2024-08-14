import "./GameRoomMemberComponent.css";
import OvAudioComponent from "./OvAudioComponent";

const GameRoomMemberComponent = ({ users }) => {
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
