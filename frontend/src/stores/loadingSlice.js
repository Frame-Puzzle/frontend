import { createSlice } from "@reduxjs/toolkit";

let loading = createSlice({
  name: 'loading',
  initialState: {
    gptLoading: false,
    imgLoading: false
  },
  reducers: {
    setGptLoading(state, action) {
      state.gptLoading = action.payload;
    },
    setImgLoading(state, action) {
      state.imgLoading = action.payload;
    }
  }
});

export let { setGptLoading, setImgLoading } = loading.actions;
export default loading;