import { createSlice } from "@reduxjs/toolkit";

let waitingRoom = createSlice({
  name: 'waitingRoom',
  initialState: {
    boardId: 0,
    boardNum: 0,
    directoryName: "",
    gameImgUrl: "",
    // gameLevel:
  }, // token 정보로 수정할 수 있도록 상태 변경 함수 정의하기
  reducers: {
    setBoardId(state, action) {
      state.boardId = action.payload
    },
    setGameImgUrl(state, action) {
      state.gameImgUrl = action.payload
    },
    setdirectoryName(state, action) {
      state.directoryName = action.payload
    },
  }
});

export let { setBoardId, setGameImgUrl, setdirectoryName } = waitingRoom.actions

export default waitingRoom;