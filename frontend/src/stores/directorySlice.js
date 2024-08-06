import { createSlice } from "@reduxjs/toolkit";

let directory = createSlice({
  name: 'directory',
  initialState: {
    /* 0 : 모달 창 없음
       1 : 멤버 초대
       2 : 디렉토리 명 수정*/
    modalId: 0
  },
  reducers: {
    setModalId(state, action) {
      state.modalId = action.payload;
    }
  }
});

// 이건 실제로 변경함수를 사용하고자 하는 파일에서 import하기
export let { setModalId } = directory.actions;

// 이건 store.js에서 import하기
export default directory;
