// useSelector 사용 못하니까 직접 스토어 가져오기
import { store } from "./../stores/store";
import * as Stomp from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient = null;

const connectSocket = (onConnectedCallback, onMessageCallback,
  onRobyCallback, onTimerCallback, id) => {

  
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
      stompClient.subscribe(`/sub/message/${id}`, (message) => {
        if (onMessageCallback) {
          onMessageCallback(JSON.parse(message.body));
        }
      });

      // Roby 정보 구독
      stompClient.subscribe(`/sub/roby/${id}`, (message) => {
        if (onRobyCallback) {
          const response = JSON.parse(message.body);
          onRobyCallback(response.roby);
        }
      });

      // 타이머 정보 구독
      stompClient.subscribe(`/sub/roby/timer/${id}`, (message) => {
        if (onTimerCallback) {
          const response = JSON.parse(message.body);
          onTimerCallback(response);
        }
      });
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