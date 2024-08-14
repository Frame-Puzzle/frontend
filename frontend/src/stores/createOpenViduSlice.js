import { createSlice } from "@reduxjs/toolkit";

let createOpenVidu = createSlice({
  name: "createOpenVidu",
  initialState: {
    session: null, // openvidu session
  },
  reducers: {
    setOpenViduSession(state, action) {
      state.session = action.payload;
    },
    clearOpenViduSession(state) {
      state.session = null;
    },
  },
});

// 이건 실제로 변경함수를 사용하고자 하는 파일에서 import하기
export let { setOpenViduSession, clearOpenViduSession } =
  createOpenVidu.actions;

// 이건 store.js에서 import하기
export default createOpenVidu;
