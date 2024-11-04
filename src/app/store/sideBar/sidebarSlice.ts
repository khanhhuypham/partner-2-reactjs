import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";




export interface IUserState {
    breadcrumb:  string;
}

const initialState: IUserState = {
    breadcrumb: ""
};

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        
        setBreadcrumb: (state: any, action: PayloadAction<string>) => {
            state.breadcrumb = action.payload;
        },

    },
});

export const {setBreadcrumb} = sidebarSlice.actions;
export const sidebarSelector = (state: RootState) => state.sidebar;
