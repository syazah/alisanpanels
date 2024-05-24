import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sideTool: false,
  currentOpen: -1,
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    startBuildingPanel: (state, action) => {
      state.sideTool = true;
      state.currentOpen = action.payload;
    },
  },
});

export const { startBuildingPanel } = configSlice.actions;
export default configSlice.reducer;
