import "./GameRoomMemberComponent.css";

const GameRoomMemberComponent = ({ users }) => {
  return (
    <div className="game-room-member-header flex">
      {users.map((user, index) => (
        <div
          key={index}
          className={`game-room-member ${user.isSpeaking ? "speaking" : ""}`}
        >
          <img
            src={user.profileUrl}
            alt={`${user.name} profile`}
            className="game-room-member-profile"
          />
          <div className="game-room-member-nickname">{user.name}</div>
        </div>
      ))}
    </div>
  );
};

export default GameRoomMemberComponent;
