import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
    name:"requests",
    initialState: [],
    reducers:{
        addRequests : (state,action) => {
            return action.payload;
        },
        removeRequests : (state,action) => {
            return state.filter((req) => req._id !== action.payload);
        }
    }
});

export const { addRequests, removeRequests } = requestsSlice.actions;

export default requestsSlice.reducer;
