import React, { useState, useEffect, useRef } from "react";
import "./GameRoom.css";
import { useParams } from "react-router-dom";
import GameBoard from "../components/game/GameBoard";
import socketApi from "../apis/socketApi";
import MainHeader from "../components/common/MainHeader";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ChatBoard from "../components/common/ChatBoard";
import GameModalFrame from "./modalFrame/GameModalFrame";

const GameRoom = () => {
  const { roomID } = useParams();
  const user = useSelector((state) => state.user);
  const waitingRoom = useSelector((state) => state.waitingRoom);
  const nav = useNavigate();

  const { connectSocket, sendMessage, disconnectSocket, exitGameRoom, exitRobyRoom } = socketApi;

  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [timer, setTimer] = useState(-1); // 화면에 표시할 timer 상태
  const [showWindow, setShowWindow] = useState(0);
  const [winner, setWinner] = useState({});

  const timerRef = useRef(timer); // 최신 timer 값을 추적하기 위한 ref

  //게임 소켓 연결
  useEffect(() => {
    connectSocket(
      () => setIsConnected(true), // 연결 확인
      (
        receivedMessage // 메시지
      ) => setMessages((prevMessage) => [...prevMessage, receivedMessage]),
      null, //게임 대기 방 정보
      null, // 게임 대기 방 timer
      null, // 게임 시작 확인
      null, // 게임 정보 받기
      (timerData) => {
        setTimer(timerData); // 화면에 표시할 timer 업데이트
        timerRef.current = timerData; // ref에도 최신값 저장
      }, // 게임 방 timer
      (endGameData) => setWinner(endGameData), // 게임 완료
      roomID // 방 번호
    );

    // visibilitychange 이벤트 리스너 추가
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        exitRoom();
        exitGameRoom(`/pub/exit/puzzle/${roomID}`);
        disconnectSocket();
        setIsConnected(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      exitRoom();
      disconnectSocket();
      setIsConnected(false);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [roomID, connectSocket, disconnectSocket]);

  useEffect(() => {
    if (isConnected) {
      joinRoom();
    }
    //소켓 연결 후 게임 시작되게 하기
  }, [isConnected]);

  useEffect(() => {
    if (Object.keys(winner).length === 0) return;
    
    // 5초 후 완료된 퍼즐판 화면으로 이동
    setTimeout(() => {
      setWinner({});
      nav(`/boards/${roomID}`);
    }, 5000); 
  }, [winner, nav, roomID]);

  const joinRoom = () => {
    const data = {
      boardId: roomID,
      userId: 0,
      message: `${user.nickName}이 입장하였습니다.`,
    };

    sendMessage(`/pub/roby/entry/${roomID}`, data);
  };

  const exitRoom = () => {
    const data = {
      boardId: roomID,
      userId: 0,
      nickName : user.nickName,
      message: `${user.nickName}이 퇴장하셨습니다.`,
    };

    exitRobyRoom(`/pub/roby/exit/${roomID}`, data);
  };

  const sendEndGame = () => {
    console.log(timerRef.current); // 최신 timer 값을 출력
    const data = {
      time: timerRef.current, // 최신 timer 값을 사용
    };
    sendMessage(`/pub/end/puzzle/${roomID}`, data);
  };

  const showWindowImg = () => {
    if (showWindow !== 2) setShowWindow(2);
    else setShowWindow(0);
  };

  const showWindowChat = () => {
    if (showWindow !== 1) setShowWindow(1);
    else setShowWindow(0);
  };

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
      boardId: roomID,
      userId: 0,
      nickname: user.nickName,
      message: inputMessage,
    };

    sendMessage(`/pub/message/${roomID}`, data);
    setInputMessage("");
  };

  return (
    <div className="w-full h-full">
      {Object.keys(winner).length !== 0 ? (
        <GameModalFrame winner={winner} />
      ) : null}
      <div className="game-room-header">
        <MainHeader title="PUZZLE" timer={timer} path={0} />
      </div>

      <div className="game-room-member-header">멤버 헤더</div>

      <div className="game-room-game-board">
        <div className = {showWindow === 0 ? "visible" : "hidden"}>
          <GameBoard id={roomID} sendEndGame={sendEndGame} />
      </div>
      
        {showWindow === 1 ? (
          <>
            <ChatBoard messages={messages} />
            <div className="game-chat-input-container">
              <input
                className="game-chat-input"
                type="text"
                value={inputMessage}
                onChange={handleInputMessage}
                onKeyDown={handleKeyDown}
                placeholder="내용을 입력해주세요"
              />
              <button
                className="game-chat-input-button"
                onClick={sendInputMessage}
              />
            </div>
          </>
        ) : null}
        {showWindow === 2 ? (
          <img
            className="show-waiting-room-game-img"
            src={waitingRoom.gameImgUrl || ""}
            alt="show-img"
          />
          ) : null}
         
      </div>
      
      <div className="game-room-footer">
        <div className="game-room-footer-button">
          <img
            src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/headset.png"
            alt="show-img"
          />
        </div>
        <div className="game-room-footer-button">
          <img
            src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/voice.png"
            alt="show-img"
          />
        </div>
        <div className="game-room-footer-button">
          <img
            src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/chat.png"
            alt="game-chat"
            onClick={showWindowChat}
          />
        </div>
        <div className="game-room-footer-button">
          <img
            src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/img-white.png"
            alt="show-img"
            onClick={showWindowImg}
          />
        </div>
      </div>
    </div>
  );
};

export default GameRoom;
