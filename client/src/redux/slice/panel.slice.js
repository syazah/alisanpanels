import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  panelSize: 2,
  panelVariant: {
    switches: 0,
    bells: 0,
    curtains: 0,
    fans: 0,
    plugs: 0,
    dimmers: 0,
  },
  panelGlass: "#000",
  panelFrame: "#E5E7EB",
  panelIcons: [],
  panelWall: "#3F3F46",
  collectionsArray: [],
};

const panelSlice = createSlice({
  name: "panel",
  initialState,
  reducers: {
    BuildPanelSize: (state, action) => {
      state.panelSize = action.payload;
      state.panelVariant = {
        switches: 0,
        bells: 0,
        curtains: 0,
        fans: 0,
        plugs: 0,
        dimmers: 0,
      };
    },
    BuildPanelVariant: (state, action) => {
      state.panelVariant = action.payload;
    },
    BuildPanelGlass: (state, action) => {
      state.panelGlass = action.payload;
    },
    BuildPanelFrame: (state, action) => {
      state.panelFrame = action.payload;
    },
    BuildPanelIcons: (state, action) => {
      state.panelIcons = action.payload;
    },
    BuildPanelWall: (state, action) => {
      state.panelWall = action.payload;
    },
    UpdateCollectionsArray: (state, action) => {
      state.collectionsArray = action.payload;
    },
  },
});

export const {
  BuildPanelSize,
  BuildPanelVariant,
  BuildPanelGlass,
  BuildPanelFrame,
  BuildPanelIcons,
  BuildPanelWall,
  UpdateCollectionsArray,
} = panelSlice.actions;
export default panelSlice.reducer;
