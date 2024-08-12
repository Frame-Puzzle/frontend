// useSelector 사용 못하니까 직접 스토어 가져오기
import { store } from "../stores/store";
import * as Stomp from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient = null;

const connectSocket = (onConnectedCallback, onMessageCallback,
  onRobyCallback, onWaitingTimerCallback, onGameStartCallback,
  onGameInfoCallback, onGameTimerCallback, id) => {


  const state = store.getState();
  const accessToken = state.user.accessToken;

  const socket = new SockJS(`${import.meta.env.VITE_BACK_URL}/api/v1/ws`);
  stompClient = Stomp.Stomp.over(socket);

  const headers = { Authorization: `Bearer ${accessToken}` };

  stompClient.connect(
    headers,
    () => {
      if (onConnectedCallback) {
        onConnectedCallback();
      }

      // 메시지 구독
      if (onMessageCallback) {
        stompClient.subscribe(`/sub/message/${id}`, (message) => {
          onMessageCallback(JSON.parse(message.body));
        });
      }

      // Roby 정보 구독
      if (onRobyCallback) {
        stompClient.subscribe(`/sub/roby/${id}`, (message) => {
          const response = JSON.parse(message.body);
          onRobyCallback(response.roby);
        });
      }

      // 타이머 정보 구독
      if (onWaitingTimerCallback) {
        stompClient.subscribe(`/sub/roby/timer/${id}`, (message) => {
          const response = JSON.parse(message.body);
          onWaitingTimerCallback(response);
        });
      }

      // 게임 시작 정보 구독
      if (onGameStartCallback) {
        stompClient.subscribe(`/sub/start/${id}`, (message) => {
          const response = JSON.parse(message.body);
          onGameStartCallback(response.flag);
        });
      }

      // 게임 정보 받기
      if (onGameInfoCallback) {
        stompClient.subscribe(`/sub/game/info/${id}`, (message) => {
          const response = JSON.parse(message.body);
          onGameInfoCallback(response);
        });
      }

      // 게임 방 타이머
      if (onGameTimerCallback) {
        stompClient.subscribe(`/sub/game/timer/${id}`, (message) => {
          const response = JSON.parse(message.body);
          onGameTimerCallback(response);
        })
      }
    }
  );
}

const sendMessage = (destination, message) => {
  if (stompClient && stompClient.connected) {
    stompClient.send(destination, {}, JSON.stringify(message));
  }
  else {
    console.error('STOMP client is not connected. Cannot send message.');
  }
}

const disconnectSocket = () => {
  if (stompClient && stompClient.connected) {
    stompClient.disconnect(() => {
      console.log('Disconnected from WebSocket');
    });
  }
}

const socketApi = { disconnectSocket, sendMessage, connectSocket }

export default socketApi;