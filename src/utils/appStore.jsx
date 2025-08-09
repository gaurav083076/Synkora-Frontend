import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./store/userSlice";
import feedReducer from "./store/feedSlice";
import connectionsReducer  from "./store/connectionSlice";
import requestsReducer from "./store/requestsSlice";

const appStore = configureStore({
    reducer: {
        user : userReducer,
        feed : feedReducer,
        connections : connectionsReducer,
        requests : requestsReducer
    }
});

export default appStore;