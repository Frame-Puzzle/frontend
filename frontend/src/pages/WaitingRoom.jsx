import React, { useEffect, useState } from "react";
import MainHeader from "../components/common/MainHeader";
import { useSelector } from "react-redux";
import socketApi from "../apis/socketApi";
import "./WaitingRoom.css";

const WaitingRoom = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [robyData, setRobyData] = useState(null);
  const [timer, setTimer] = useState(0);

  const { connectSocket, sendMessage, disconnectSocket } = socketApi;

  const waitingRoom = useSelector((state) => state.waitingRoom);

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
      disconnectSocket();
      setIsConnected(false);
    };
  }, [waitingRoom.boardId]); // useEffect의 의존성 배열에 waitingRoom.boardId 추가

  // 소켓 연결 후 방 입장
  useEffect(() => {
    if (!isConnected) return;

    joinRoom();
  }, [isConnected]);

  const joinRoom = () => {
    const message = {
      boardId: waitingRoom.boardId,
      userId: 0, // 불필요하다면 삭제 가능
      message: "유저 닉네임이 입장하였습니다.",
    };

    sendMessage(`/pub/roby/entry/${waitingRoom.boardId}`, message);
  };

  return (
    <>
      <div className="w-full h-full flex flex-wrap relative">
        <div className="waiting-room-header">
          <MainHeader title={"PUZZLE"} />
        </div>

        <div className="waiting-room-body">
          {/* 메시지 목록 표시 */}
          <div>
            <h2>Messages:</h2>
            <ul>
              {messages.map((msg, index) => (
                <li key={index}>
                  <strong>{msg.nickname ? `${msg.nickname}:` : ''}</strong> {msg.message}
                </li>
              ))}
            </ul>
          </div>

          {/* Roby 정보 표시 */}
          <div>
            <h2>Roby Details:</h2>
            {robyData ? (
              <div>
                <p>Roby ID: {robyData.robyId}</p>
                <p>Max People: {robyData.maxPeople}</p>
                <p>Start Time: {new Date(robyData.startTime).toLocaleString()}</p>
                <p>End Time: {new Date(robyData.endTime).toLocaleString()}</p>
                <p>Host: {robyData.king.nickname}</p>
                <h3>Connected Users ({robyData.robyUserList?.length || 0}):</h3>
                <ul>
                  {robyData.robyUserList?.map((user, index) => (
                    <li key={index}>
                      <strong>{user.nickname}</strong> - <img src={user.profileImg} alt={user.nickname} width="30" />
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>Loading roby details...</p>
            )}
          </div>

          {/* 타이머 표시 */}
          <div>
            <h2>Timer:</h2>
            <p>{timer}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default WaitingRoom;
