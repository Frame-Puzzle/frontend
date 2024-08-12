import React, { useState, useEffect } from "react";
import "./GameRoom.css";
import { useParams } from "react-router-dom";
import GameBoard from "../components/game/GameBoard";
import socketApi from "../apis/socketApi";
import MainHeader from "../components/common/MainHeader";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const GameRoom = () => {
  const { roomID } = useParams();
  const user = useSelector((state) => state.user);
  const waitingRoom = useSelector((state) => state.waitingRoom);
  const nav = useNavigate();

  const { connectSocket, sendMessage, disconnectSocket } = socketApi;

  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [timer, setTimer] = useState(-1);
  const [endGame, setEndGame] = useState({});

  //게임 소켓 연결
  // socket 연결
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
      (timerData) => setTimer(timerData), // 게임 방 timer
      (endGameData) => setEndGame(endGameData), // 게임 와
      roomID // 방 번호
    );

    return () => {
      exitRoom();
      disconnectSocket();
      setIsConnected(false);
    };
  }, [roomID]);

  useEffect(() => {
    if (isConnected) {
      joinRoom();
    }
    //소켓 연결 후 게임 시작되게 하기
  }, [isConnected]);

  useEffect(() => {

    // 결과 모달 창에 들어가야 할 내용
    console.log(endGame);

    // 10초 후 완료된 퍼즐판 화면으로 이동
    setTimeout(() => {
      nav(`/boards/${roomID}`);
    }, 10000); // 10,000ms = 10초
  }, [endGame]);

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
      message: `${user.nickName}이 퇴장하셨습니다.`,
    };

    sendMessage(`/pub/roby/exit/${roomID}`, data);
  };

  const sendEndGame = () => {
    const data = {
      time: timer,
    };
    sendMessage(`/pub/end/puzzle/${roomID}`, data);
  };

  return (
    <div className="w-full h-full">
      <div className="game-room-header">
        {/* <MainHeader />에 icon props로 건네주는 img의 width는 항상 120%로 고정하는 것으로 약속한다. */}
        {/* <MainHeader />에 path를 "/home"으로 해야하는 이유는 닉네임 변경 후 자동으로 마이페이지로 라우팅 된 후에 마이페이지에서 뒤로 가기를 누르면
        홈으로 라우팅 되는 것이 아니라 다시 닉네임 변경 페이지로 라우팅되기 때문이다. */}
        <MainHeader title="PUZZLE" timer={timer} path={0} />
      </div>
      <div className="game-room-member-header">멤버 헤더</div>
      <div className="game-room-game-board">
        <GameBoard id={roomID} sendEndGame={sendEndGame} />
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
            alt="show-img"
          />
        </div>
        <div className="game-room-footer-button">
          <img
            src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/img-white.png"
            alt="show-img"
          />
        </div>
      </div>
    </div>
  );
};

export default GameRoom;
