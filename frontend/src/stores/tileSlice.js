import { createSlice } from "@reduxjs/toolkit";

let tile = createSlice({
  name: 'tile',
  initialState: {
    tileInfo: {},
    tileId: 0,
  },
  reducers: {
    setTileInfo(state, action) {
      state.tileInfo = action.payload;
    },
    setTileId(state, action) {
      state.tileId = action.payload;
    },
  }
});

// 이건 실제로 변경함수를 사용하고자 하는 파일에서 import하기
export let { setTileInfo, setTileId } = tile.actions;

// 이건 store.js에서 import하기
export default tile;
