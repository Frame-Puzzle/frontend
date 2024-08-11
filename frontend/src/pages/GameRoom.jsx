import React, { useState, useEffect } from "react";
import "./GameRoom.css";
import { useParams } from "react-router-dom";
import GameBoard from "../components/game/GameBoard";
import socketApi from "../apis/socketApi";

const GameRoom = () => {
  const id = useParams();

  const { connectSocket, sendMessage, disconnectSocket } = socketApi;

  //const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [gameData, setGameData] = useState(null);

  //게임 소켓 연결
  // socket 연결
  useEffect(() => {
    console.log("게임 소켓 연결");
    connectSocket(
      () => setIsConnected(true),
      (receivedMessage) =>
        setMessages((prevMessage) => [...prevMessage, receivedMessage]),
      null,
      null,
      (gameData) => setGameData(gameData),
      id
    );

    return () => {
      disconnectSocket();
      setIsConnected(false);
    };
  }, [connectSocket, disconnectSocket, id]);

  useEffect(() => {
    console.log("카운트다운");
    //소켓 연결 후 게임 시작되게 하기
  }, [isConnected]);

  return (
    <div>
      게임 방 입니다.
      <GameBoard
        id={id}
        messages={messages}
        sendMessage={sendMessage}
        isConnected={isConnected}
      />
    </div>
  );
};

export default GameRoom;
