import React, { useEffect, useState } from "react";
import MainHeader from "../components/common/MainHeader";
import GameWaitingRoomHeader from "../components/common/GameWaitingRoomHeader";
import { useSelector } from "react-redux";
import socketApi from "../apis/socketApi";
import "./WaitingRoom.css";
import ChatBoard from "../components/common/ChatBoard";
import MainNav from "../components/common/MainNav";
import { useNavigate } from "react-router-dom";

const WaitingRoom = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [robyData, setRobyData] = useState(null);
  const [timer, setTimer] = useState(100);

  const [robyKing, setRobyKing] = useState("");
  const [robyUserList, setRobyUserList] = useState([]);
  const [activateButton, setActivateButton] = useState([false]);
  const [showGameImg, setShowGameImg] = useState(false);

  const { connectSocket, sendMessage, disconnectSocket } = socketApi;

  const waitingRoom = useSelector((state) => state.waitingRoom);
  const user = useSelector((state) => state.user);

  const nav = useNavigate();

  // socket 연결
  useEffect(() => {
    connectSocket(
      () => setIsConnected(true),
      (receivedMessage) =>
        setMessages((prevMessage) => [...prevMessage, receivedMessage]),
      (robyData) => setRobyData(robyData),
      (timerData) => setTimer(timerData),
      waitingRoom.boardId
    );

    return () => {
      exitRoom();
      disconnectSocket();
      setIsConnected(false);
    };
  }, []); // useEffect의 의존성 배열에 waitingRoom.boardId 추가

  // 소켓 연결 후 방 입장
  useEffect(() => {
    if (!isConnected) return;

    joinRoom();
  }, [isConnected]);

  const joinRoom = () => {
    const data = {
      boardId: waitingRoom.boardId,
      userId: 0, // 불필요하다면 삭제 가능
      message: "유저 닉네임이 입장하였습니다.",
    };

    sendMessage(`/pub/roby/entry/${waitingRoom.boardId}`, data);
  };

  const exitRoom = () => {
    const data = {
      boardId: waitingRoom.boardId,
      userId: 0, // 불필요하다면 삭제 가능
      message: "유저 닉네임이 퇴장하셨습니다.",
    };

    sendMessage(`/pub/roby/exit/${waitingRoom.boardId}`, data);
  };

  // 데이터 불러온 후
  useEffect(() => {
    console.log(waitingRoom.directoryName);
    if (!robyData) {
      return;
    }

    setRobyKing(robyData.king);
    setRobyUserList(robyData.robyUserList);

    setActivateButton(robyData.maxPeople / 2 <= robyData.robyUserList.size);
  }, [robyData]);

  const handleInputMessage = (event) => {
    setInputMessage(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key !== "Enter") {
      return;
    }

    sendInputMessage();
  };

  const sendInputMessage = () => {
    if (inputMessage === "") return;
    const data = {
      boardId: waitingRoom.boardId,
      userId: 0, // 불필요한 정보
      nickname: user.nickName,
      message: inputMessage,
    };

    sendMessage(`/pub/message/${waitingRoom.boardId}`, data);
    setInputMessage("");
  };

  useEffect(() => {
    if (timer !== 0) {
      return;
    }

    nav(`/boards/${waitingRoom.boardId}`);
  }, [timer]);

  return (
    <>
      <div className="w-full h-full flex flex-wrap relative">
        <div className="waiting-room-header">
          <MainHeader
            title={"PUZZLE"}
            directoryName={waitingRoom.directoryName}
          />
        </div>
        <div className="waiting-room-participation">
          <GameWaitingRoomHeader
            robyKing={robyKing}
            robyUserList={robyUserList}
          />
        </div>

        <div className="waiting-room-body">
          {showGameImg ? (
            <img
              className="show-waiting-room-game-img"
              src={robyData.imgUrl}
              alt="show-img"
            />
          ) : (
            <ChatBoard messages={messages} />
          )}

          <div className="chat-input-container">
            <input
              className="chat-input"
              type="text"
              value={inputMessage}
              onChange={handleInputMessage}
              onKeyDown={handleKeyDown}
              placeholder="내용을 입력해주세요"
            />
            <button className="chat-input-button" onClick={sendInputMessage} />
          </div>
        </div>
        <div className="enter-game-room-container">
          <button className="enter-game-room-button" disabled={activateButton}>
            {activateButton
              ? `${timer}초 후에 방이 폭파됩니다.`
              : `준비
              (${timer}초 후에 방이 폭파됩니다.)`}
          </button>
          <div
            className="show-game-img"
            onClick={() => setShowGameImg(!showGameImg)}
          >
            <img
              src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/edit-image-photo.png"
              alt="show-img"
            />
          </div>
        </div>
        <div className="waiting-room-footer">
          <MainNav />
        </div>
      </div>
    </>
  );
};

export default WaitingRoom;
