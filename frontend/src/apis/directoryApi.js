import axios from "axios";
// useSelector 사용 못하니까 직접 스토어 가져오기
import { store } from "./../stores/store";

// axios 객체 만들기
const directoryApi = axios.create({
  baseURL: `${import.meta.env.VITE_BACK_URL}/api/v1/directories`,
}); // BASE_URL/api/vi/directories?category={category}

// axios 객체에 요청 인터셉터 추가하기 (헤더에 JWT Token 삽입하기)
directoryApi.interceptors.request.use(
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

// axios 객체에 응답 인터셉터 추가하기 (로그인 화면으로 보내기)
directoryApi.interceptors.response.use(
  (response) => response,
  (error) => {
    // TO DO
  }
);

export default directoryApi;