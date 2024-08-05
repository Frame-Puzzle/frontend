import axios from "axios";
import { store } from "./../stores/store";

// axios 객체 만들기

const gameOpenViduApi = axios.create({
  baseURL: `${import.meta.env.VITE_OPENVIDU_SERVER_URL}/api/v1/voice-chats`,
}); // BASE_URL/api/vi/voice-chats?boardId={boardId}

// axios 객체에 요청 인터셉터 추가하기 (헤더에 JWT Token 삽입하기)
gameOpenViduApi.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const accessToken = state.user.accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default gameOpenViduApi;
