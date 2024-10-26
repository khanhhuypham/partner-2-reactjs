import { configureStore } from "@reduxjs/toolkit";
import { userDataSlice } from "./userDataSlice";
import { notificationSlice } from "./notification/notificationSlice";

export const store = configureStore({
    reducer: {
        userData: userDataSlice.reducer,
        notification: notificationSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
