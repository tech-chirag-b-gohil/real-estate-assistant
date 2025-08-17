import { createSlice } from "@reduxjs/toolkit";

export interface SiderState {
  isOpen: boolean;
}

const initialState: SiderState = {
  isOpen: true,
};

const siderSlice = createSlice({
  name: "sider",
  initialState,
  reducers: {
    openSider: (state) => {
      state.isOpen = true;
    },
    closeSider: (state) => {
      state.isOpen = false;
    },
    toggleSider: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openSider, closeSider, toggleSider } = siderSlice.actions;

export default siderSlice.reducer;
