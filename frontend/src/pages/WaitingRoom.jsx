import React, { useEffect, useState } from "react";
import { store } from "./../stores/store"; // Redux 스토어 직접 가져오기
import socketApi from "../apis/socketApi";
import MainHeader from "../components/common/MainHeader";
import GameWaitingRoomHeader from "../components/common/GameWaitingRoomHeader";
import ChatBoard from "../components/common/ChatBoard";
import MainNav from "../components/common/MainNav";
import { useNavigate } from "react-router-dom";
import "./WaitingRoom.css";

const WaitingRoom = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [robyData, setRobyData] = useState(null);
  const [timer, setTimer] = useState(-1);
  const [gameStart, setGameStart] = useState(false);
  const [robyKing, setRobyKing] = useState("");
  const [robyUserList, setRobyUserList] = useState([]);
  const [activateButton, setActivateButton] = useState(false);
  const [showGameImg, setShowGameImg] = useState(false);

  const { connectSocket, sendMessage, disconnectSocket } = socketApi;
  const nav = useNavigate();

  const state = store.getState(); // Redux 상태 직접 가져오기
  const waitingRoom = state.waitingRoom;
  const user = state.user;

  // socket 연결
  useEffect(() => {
    if (!waitingRoom.boardId) return;

    connectSocket(
      () => setIsConnected(true),
      (receivedMessage) =>
        setMessages((prevMessage) => [...prevMessage, receivedMessage]),
      (robyData) => setRobyData(robyData),
      (timerData) => setTimer(timerData),
      () => setGameStart(true),
      waitingRoom.boardId
    );

    return () => {
      exitRoom();
      disconnectSocket();
      setIsConnected(false);
    };
  }, [waitingRoom.boardId]); // 의존성 배열에 boardId 추가

  // 게임 시작 시 게임 룸으로 이동
  useEffect(() => {
    console.log("게임 시작 시 게임 룸으로 이동");
    if (gameStart) {
      nav(`/game-room/${waitingRoom.boardId}`);
    }
  }, [gameStart]);

  // 소켓 연결 후 방 입장
  useEffect(() => {
    if (isConnected) {
      joinRoom();
    }
  }, [isConnected, waitingRoom.boardId]);

  const joinRoom = () => {
    const data = {
      boardId: waitingRoom.boardId,
      userId: 0,
      message: `${user.nickName}이 입장하였습니다.`,
    };

    sendMessage(`/pub/roby/entry/${waitingRoom.boardId}`, data);
  };

  const exitRoom = () => {
    const data = {
      boardId: waitingRoom.boardId,
      userId: 0,
      message: `${user.nickName}이 퇴장하셨습니다.`,
    };

    sendMessage(`/pub/roby/exit/${waitingRoom.boardId}`, data);
  };

  // Roby 데이터에 대한 처리
  useEffect(() => {
    if (robyData) {
      setRobyKing(robyData.king);
      setRobyUserList(robyData.robyUserList);
      setActivateButton(
        robyData.maxPeople / 2 <= robyData.robyUserList.length &&
          robyData.king.nickname === user.nickName
      );
    }
  }, [robyData, user.nickName]);

  const handleInputMessage = (event) => {
    setInputMessage(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendInputMessage();
    }
  };

  const sendInputMessage = () => {
    if (inputMessage.trim() === "") return;

    const data = {
      boardId: waitingRoom.boardId,
      userId: 0,
      nickname: user.nickName,
      message: inputMessage,
    };

    sendMessage(`/pub/message/${waitingRoom.boardId}`, data);
    setInputMessage("");
  };

  // 타이머 종료 시 처리
  useEffect(() => {
    if (timer === 0) {
      nav(`/boards/${waitingRoom.boardId}`);
    }
  }, [timer, nav, waitingRoom.boardId]);

  const moveGameRoom = () => {
    const data = {
      boardId: waitingRoom.boardId,
      start: true,
      size: waitingRoom.level,
    };

    sendMessage(`/pub/start/${waitingRoom.boardId}`, data);
  };

  return (
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
            src={robyData?.imgUrl || ""}
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
        <button
          className="enter-game-room-button"
          disabled={!activateButton}
          onClick={moveGameRoom}
        >
          {activateButton
            ? `준비 완료 (${timer}초 후에 방이 폭파됩니다.)`
            : `${timer}초 후에 방이 폭파됩니다.`}
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
  );
};

export default WaitingRoom;
