import { createSlice } from "@reduxjs/toolkit";

let createBoard = createSlice({
  name: 'createBoard',
  initialState: {
    boardSize: 0,
<<<<<<< HEAD
    keyword: [],
    guide: [],
    directoryId: '',
    
=======
    keyWord: [],
    guide: [],
    directoryId: '',
    missionCnt: 0
>>>>>>> 667c9ba31e36d6f9466697dfc1bc5e9a96e7ffb0
  },
  reducers: {
    setBoardSize(state, action) {
      state.boardSize = action.payload;
    },
<<<<<<< HEAD
    setKeyword(state, action) {
      state.keyword = action.payload;
=======
    setKeyWord(state, action) {
      state.keyWord = action.payload;
>>>>>>> 667c9ba31e36d6f9466697dfc1bc5e9a96e7ffb0
    },
    setGuide(state, action) {
      state.guide = action.payload;
    },
    setDirectoryId(state, action) {
      state.directoryId = action.payload;
<<<<<<< HEAD
=======
    },
    setMissionCnt(state, action) {
      state.missionCnt = action.payload;
>>>>>>> 667c9ba31e36d6f9466697dfc1bc5e9a96e7ffb0
    }
  }
});

// 이건 실제로 변경함수를 사용하고자 하는 파일에서 import하기
<<<<<<< HEAD
export let { setBoardSize, setKeyword, setGuide, setDirectoryId } = createBoard.actions;
=======
export let { setBoardSize, setKeyWord, setGuide, setDirectoryId, setMissionCnt } = createBoard.actions;
>>>>>>> 667c9ba31e36d6f9466697dfc1bc5e9a96e7ffb0

// 이건 store.js에서 import하기
export default createBoard;