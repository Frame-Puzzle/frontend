import axios from "axios";

// axios 객체 만들기
const authApi = axios.create({
  baseURL: `${import.meta.env.VITE_BACK_URL}/api/v1/login/oauth`,
});

export default authApi;