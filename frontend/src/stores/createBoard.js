import { createSlice } from "@reduxjs/toolkit";

let createBoard = createSlice({
  name: 'createBoard',
  initialState: {
    boardSize: 0,
    keyword: [],
    guide: [],
    directoryId: '',
  },
  reducers: {
    setBoardSize(state, action) {
      state.boardSize = action.payload;
    },
    setKeyword(state, action) {
      state.keyword = action.payload;
    },
    setGuide(state, action) {
      state.guide = action.payload;
    },
    setDirectoryId(state, action) {
      state.directoryId = action.payload;
    }
  }
});

// 이건 실제로 변경함수를 사용하고자 하는 파일에서 import하기
export let { setBoardSize, setKeyword, setGuide, setDirectoryId } = createBoard.actions;

// 이건 store.js에서 import하기
export default createBoard;