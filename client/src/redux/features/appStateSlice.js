import { createSlice } from "@reduxjs/toolkit";

export const appStateSlice = createSlice({
    name: "AppState",
    initalState: {
        appState: ""
    },
    reducers: {
        setAppState: (state, action) => {
            state.appState = action.payload;
        }
    }
});

export const {
    setAppState
} = appStateSlice.actions;

export default appStateSlice.reducer;