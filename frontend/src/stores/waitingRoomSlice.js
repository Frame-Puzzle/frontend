import { createSlice } from "@reduxjs/toolkit";

let waitingRoom = createSlice({
  name: 'waitingRoom',
  initialState: {
    accessToken: '',
    refreshToken: '',
    nickName: '',
    profileImg: '',
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
    },
    setProfileImg(state, action) {
      state.profileImg = action.payload
    }
  }
});