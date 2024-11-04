import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../models/user/user';
import { removeSessionToken, saveToken } from './sessionManager';
import { RootState } from './store';


export interface IUserState {
    user: User | null;
}

const initialState: IUserState = {
    user:new User()
};

export const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        
    
        setUser: (state: any, action: PayloadAction<User>) => {
            saveToken(action.payload.access_token)
            state.user = action.payload;
        },

        removeUser: (state: any) => {
            removeSessionToken();
            state.user = null;
        },
    },
});

export const {setUser,removeUser } = userDataSlice.actions;
export const userSelector = (state: RootState) => state.userData;

