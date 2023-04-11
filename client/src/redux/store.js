import { configureStore } from "@reduxjs/toolkit";
import appStateSlice from "./features/appStateSlice.jsx";
import authModalSlice from "./features/authModalSlice.jsx";
import globalLoadingSlice from "./features/globalLoadingSlice.jsx";
import themeModeSlice from "./features/themeModeSlice.jsx";
import userSlice from "./features/userSlice.jsx";

const store = configureStore({
    reducer: {
        user: userSlice,
        themeMode: themeModeSlice,
        authModal: authModalSlice,
        globalLoading: globalLoadingSlice,
        appState: appStateSlice,
    }
});

export default store;