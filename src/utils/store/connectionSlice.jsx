import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connections",
  initialState: [],
  reducers: {
    addConnections: (state, action) => {
      return action.payload;
    },
    removeConnection: (state, action) => {
      return state.filter((user) => user._id !== action.payload);
    }
  }
});

export const { addConnections, removeConnection } = connectionSlice.actions;
export default connectionSlice.reducer;
