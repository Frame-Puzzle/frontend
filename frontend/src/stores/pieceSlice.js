import { createSlice } from "@reduxjs/toolkit";

let piece = createSlice({
  name: 'piece',
  initialState: {
    imgUrl: "",
    comment: "",
    pieceId: 0,
  },
  reducers: {
    setPieceId(state, action) {
      state.pieceId = action.payload;
    },
    setImgUrl(state, action) {
      state.imgUrl = action.payload;
    },
    setComment(state, action) {
      state.comment = action.payload
    }
  }
});

// 이건 실제로 변경함수를 사용하고자 하는 파일에서 import하기
export let { setPieceId, setImgUrl, setComment } = piece.actions;

// 이건 store.js에서 import하기
export default piece;
