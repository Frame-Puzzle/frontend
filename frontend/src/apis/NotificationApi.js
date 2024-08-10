import axios from "axios";
import { store } from "../stores/store";
import { setAccessToken } from "../stores/userSlice";

// axios 객체 만들기
const NotificationApi = axios.create({
  baseURL: `${import.meta.env.VITE_BACK_URL}/api/v1/notifications`,
});

// axios 객체에 요청 인터셉터 추가하기 (헤더에 JWT Token 삽입하기)
NotificationApi.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const accessToken = state.user.accessToken;
    
    if (accessToken && accessToken !== "") {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

NotificationApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("요청 응답 오류", error);
    if (error.response) {
      console.log("error", error.response.data);
      const status = error.response.status;

      if (status === 401) {
        store.dispatch(setAccessToken(""));
        window.location.href = "/";
      }
    } else if (error.request) {
      console.error("No response received from the server:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    return Promise.reject(error);
  }
);
export default NotificationApi;
