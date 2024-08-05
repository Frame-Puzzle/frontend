import { createSlice } from "@reduxjs/toolkit";

let piece = createSlice({
  name: 'piece',
  initialState: {
    pieceInfo: {},
    pieceId: 0,
  },
  reducers: {
    setPieceInfo(state, action) {
      state.pieceInfo = action.payload;
    },
    setPieceId(state, action) {
      state.pieceId = action.payload;
    },
  }
});

// 이건 실제로 변경함수를 사용하고자 하는 파일에서 import하기
export let { setPieceInfo, setPieceId } = piece.actions;

// 이건 store.js에서 import하기
export default piece;
