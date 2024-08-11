import { useEffect, useRef, useState } from "react";
import { OpenVidu } from "openvidu-browser";
import { useSelector } from "react-redux";
import gameOpenViduApi from "../../apis/gameOpenViduApi";
import { detectVoice } from "./detectVoice";
import AudioDeviceSelector from "./AudioDeviceSelector";

// 아래 코드는 session, token 값 변경에 따라 마이크 설정 및 입장과 관련된 openvidu testcode입니다.
const GameOpenVidu = () => {
  const publisher = useRef(null);
  // 기존 user의 nickname 가져옴
  const nickname = useSelector((state) => state.user.nickName);
  const [sessionId, setSessionId] = useState(null);
  const [tokenId, setTokenId] = useState(null);
  const [myUserName, setMyUserName] = useState(nickname);
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

  const boardId = useRef(1);

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
      const requestData = { boardId: boardId.current };
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
        console.log("Received connection data:", connectionData); // 디버그를 위한 로그 추가
        const nickname = connectionData.clientData; // 각각 client에 대한 정보
        setUsers((users) => [
          ...users,
          {
            id: event.stream.connection.connectionId,
            name: nickname,
            isSpeaking: false,
          },
        ]);
        // 스트림을 구독하고 송신을 건네 받을 수신자들 설정하기
        const subscriber = mySession.subscribe(event.stream, undefined);

        // 오디오 요소 추가하기
        const audioElement = document.createElement("audio");
        audioElement.setAttribute("autoplay", "true");
        audioElement.setAttribute("controls", "true");

        // 스트림이 오디오 출력 장치로 전달되도록 설정하기
        audioElement.srcObject = subscriber.stream.getMediaStream();
        console.log("오디오 요소 생성 및 스트림 연결!", audioElement); // 오디오 요소 생성 및 스트림 연결 로그 출력

        // 오디오 요소를 DOM에 추가해 브라우저에서 스트림 재생하기
        document.body.appendChild(audioElement);
        console.log("오디오 요소가 DOM에 추가되었음을 로그로 출력");
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

  return (
    <div>
      <span onClick={handleJoinClick}>Join Voice Chat</span>
      <span onClick={leaveSession}>Leave Voice Chat</span>
      <span onClick={toggleMute}>{isUnMuted ? "Mute" : "Unmute"}</span>
      <AudioDeviceSelector
        selectedAudio={selectedAudio}
        setSelectedAudio={setSelectedAudio}
      />
      <div>
        {users.map((user, index) => (
          <div key={index} className="user-icon">
            <div className="test-user-img">{`${index + 1} O`}</div>
            <div className="test-nickname">
              {`${user.name}`}{" "}
              {user.isSpeaking && " 음성이 들어왔네요 말하고 있군요"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameOpenVidu;
