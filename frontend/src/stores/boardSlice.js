import { createSlice } from "@reduxjs/toolkit";

let board = createSlice({
  name: 'board',
  initialState: {
    vote: false,
    modalId: 0,
    category: "",
    keywords: []
  },
  reducers: {
    setVote(state, action) {
      state.vote = action.payload;
    },
    setModalBoardId(state, action) {
      state.modalId = action.payload;
    },

    setModalId(state, action) {
      state.modalId = action.payload
    },
    setBoardCategory(state, action) {
      state.category = action.payload;
    },
    setBoardKeywords(state, action) {
      state.keywords = action.payload;
    }
  }
});

// 이건 실제로 변경함수를 사용하고자 하는 파일에서 import하기
export let { setVote, setModalId, setModalBoardId, setBoardCategory, setBoardKeywords } = board.actions;

// 이건 store.js에서 import하기
export default board;
