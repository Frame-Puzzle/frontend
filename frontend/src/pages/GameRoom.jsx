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
import { detectVoice } from "../components/gameTalk/detectVoice";
import { OpenVidu } from "openvidu-browser";
import gameOpenViduApi from "../apis/gameOpenViduApi";
import GameRoomMemberComponent from "../components/gameTalk/GameRoomMemberComponent";
import OvAudioComponent from "../components/gameTalk/OvAudioComponent";
import AudioDeviceSelector from "../components/gameTalk/AudioDeviceSelector";

const GameRoom = () => {
  const { roomID } = useParams();
  const user = useSelector((state) => state.user);
  const waitingRoom = useSelector((state) => state.waitingRoom);
  const nav = useNavigate();

  const {
    connectSocket,
    sendMessage,
    disconnectSocket,
    exitGameRoom,
    exitRobyRoom,
  } = socketApi;

  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [timer, setTimer] = useState(-1); // 화면에 표시할 timer 상태
  const [showWindow, setShowWindow] = useState(0);
  const [winner, setWinner] = useState({});

  const timerRef = useRef(timer); // 최신 timer 값을 추적하기 위한 ref

  // openvidu 아예 여기서 실행
  const publisher = useRef(null);
  // 기존 user의 nickname 가져옴
  const nickname = useSelector((state) => state.user.nickName);
  const profileImg = useSelector((state) => state.user.profileImg);
  const [sessionId, setSessionId] = useState(null);
  const [tokenId, setTokenId] = useState(null);
  const [myUserName, setMyUserName] = useState(nickname);
  const [MyProfileUrl, setMyProfileUrl] = useState(profileImg);
  const [session, setSession] = useState(null);
  // 다른 유저들이 방에 들어온 list 확인하기 위함, 들어올 때마다 update
  const [users, setUsers] = useState([]);
  const usersRef = useRef(users); // users 상태를 추적하기 위한 usersRef

  // 내 오디오 장치
  const [selectedAudio, setSelectedAudio] = useState(null);

  // 음소거 설정 초기값 true
  const [isUnMuted, setIsUnMuted] = useState(true);

  // joinSession 중인지 확인하는 상태 초기값 false
  const [isJoining, setIsJoining] = useState(false);

  // 브라우저 탭을 닫거나, 페이지를 새로 고침하거나, 앱을 종료할 때 leaveSession()을 호출하여 명시적으로 세션
  useEffect(() => {
    const onbeforeunload = () => {
      leaveSession();
    };

    // 웹 페이지를 떠나기 전 세션 leave를 먼저 진행시키기 위해 사용
    window.addEventListener("beforeunload", onbeforeunload);

    return () => {
      window.removeEventListener("beforeunload", onbeforeunload);
    };
  }, []);

  useEffect(() => {
    // audio 활성화를 위한 useEffect 함수
    if (publisher.current) {
      publisher.current.publishAudio(isUnMuted);
    }
  }, [isUnMuted]);

  const fetchTalkData = async () => {
    try {
      const requestData = { boardId: roomID };
      const response = await gameOpenViduApi.post("", requestData);
      const { sessionId, tokenId } = response.data.data;
      console.log("Fetched sessionId and tokenId:", sessionId, tokenId);
      setSessionId(sessionId);
      setTokenId(tokenId);
      return { sessionId, tokenId };
    } catch (error) {
      console.error("Error fetching session and token:", error);
    }
  };

  const joinSession = async (sessionId, tokenId) => {
    console.log("Joining session with:", sessionId, tokenId);
    if (!sessionId || !tokenId) {
      console.error("No sessionId or token available");
      return;
    }

    try {
      const OV = new OpenVidu();
      const mySession = OV.initSession();

      // 상대방 음성 감지 상태 수신 설정
      mySession.on("signal:isSpeaking", (event) => {
        const { userId, isSpeaking } = JSON.parse(event.data);
        setUsers((users) =>
          users.map((user) =>
            user.id === userId ? { ...user, isSpeaking } : user
          )
        );
      });

      mySession.on("streamCreated", (event) => {
        const connectionData = JSON.parse(event.stream.connection.data);
        const nickname = connectionData.clientData; // 각각 client에 대한 정보

        // subscriber를 이용해서 진행
        // 스트림을 구독하여 streamManager를 얻습니다.
        const subscriber = mySession.subscribe(event.stream, undefined);
        setUsers((users) => [
          ...users,
          {
            id: event.stream.connection.connectionId,
            name: nickname,
            isSpeaking: false,
            profileUrl: profileImg,
            streamManager: subscriber, // streamManager를 추가하여 OpenViduAudiocomponent에 전달
          },
        ]);
      });

      mySession.on("streamDestroyed", (event) => {
        setUsers((users) =>
          users.filter((user) => user.id !== event.stream.streamId)
        );
      });

      mySession.on("exception", (exception) => {
        console.warn(exception);
      });

      await mySession.connect(tokenId, { clientData: myUserName });

      const publisherOV = await OV.initPublisherAsync(undefined, {
        audioSource: selectedAudio || undefined, // 유효한 오디오 소스가 없으면 undefined 사용, 디바이스 내 감지된 마이크로 설정 가능
        videoSource: false,
        publishAudio: isUnMuted,
        publishVideo: false,
        insertMode: "APPEND",
        mirror: false,
      });
      mySession.publish(publisherOV);
      publisher.current = publisherOV;
      setSession(mySession);
      // 현재 사용자 정보를 users 배열에 추가
      setUsers((users) => [
        ...users,
        {
          id: publisherOV.stream.connection.connectionId,
          name: nickname,
          isSpeaking: false,
          streamManager: undefined,
          profileUrl: profileImg,
        },
      ]);

      // ov 설정 후 마지막에 detectvoice 추가
      detectVoice(publisherOV, mySession, setUsers, usersRef);
    } catch (error) {
      console.log(
        "There was an error connecting to the session:",
        error.code,
        error.message
      );
    }
  };

  const leaveSession = () => {
    if (session) {
      session.disconnect();
    }
    setSession(null);
    setUsers([]);
    setIsJoining(false);
  };

  const toggleMute = () => {
    setIsUnMuted(!isUnMuted);
  };

  const handleJoinClick = async () => {
    if (isJoining) return; // 이미 joinSession 중이면 아무 동작도 하지 않음
    setIsJoining(true); // joinSession 중으로 설정
    const { sessionId, tokenId } = await fetchTalkData();
    if (sessionId && tokenId) {
      joinSession(sessionId, tokenId);
    } else {
      console.error(
        "No sessionId or token available when trying to join session"
      );
    }
  };

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
      nickName: user.nickName,
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
      <div className="game-room-member-header">
        <GameRoomMemberComponent users={users} />
      </div>
      <div>
        {" "}
        {user.streamManager && (
          <OvAudioComponent streamManager={user.streamManager} />
        )}
      </div>
      <div className="game-room-game-board">
        <div className={showWindow === 0 ? "visible" : "hidden"}>
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
            onClick={handleJoinClick}
          />
        </div>
        <div className="game-room-footer-button">
          <img
            src="https://frazzle208.s3.ap-northeast-2.amazonaws.com/img/voice.png"
            alt="show-img"
            onClick={toggleMute}
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
      <div className="hidden-audio-selector">
        <AudioDeviceSelector
          selectedAudio={selectedAudio}
          setSelectedAudio={setSelectedAudio}
        />
      </div>
    </div>
  );
};

export default GameRoom;
