import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: 'user',
  initialState: {
    accessToken: '',
    refreshToken: '',
    nickName: ''
  }, // token 정보로 수정할 수 있도록 상태 변경 함수 정의하기
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    setRefreshToken(state, action) {
      state.refreshToken = action.payload;
    },
    setNickName(state, action) {
      state.nickName = action.payload;
    }
  }
});

// 이건 실제로 변경함수를 사용하고자 하는 파일에서 import하기
export let { setAccessToken, setRefreshToken, setNickName } = user.actions;

// 이건 store.js에서 import하기
export default user;
