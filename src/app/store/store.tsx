import { configureStore } from "@reduxjs/toolkit";
import { userDataSlice } from "./userDataSlice";
import { notificationSlice } from "./notification/notificationSlice";
import { sidebarSlice } from "./sideBar/sidebarSlice";



export const store = configureStore({
    reducer: {
        userData: userDataSlice.reducer,
        notification: notificationSlice.reducer,
        sidebar: sidebarSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
