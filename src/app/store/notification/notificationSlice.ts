import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { NotifiType } from '../../constants/notificationType';



export interface INotificationState {
    show: boolean;
    type?: NotifiType;
    content?: string;
}

const initialState: INotificationState = {
    show:false,
    type:NotifiType.neutral,
    content:"This is a time-sensitive Error Alert."
};

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        
        hideNotifi: (state: any) => {
            state.show = false;
        },

        showSuccessNotifi: (state: any,action: PayloadAction<string>) => {
            state.type = NotifiType.success
            state.content = action.payload
            state.show = true;
        },

        showNeuTralNotifi: (state: any, action: PayloadAction<string>) => {
            state.type = NotifiType.neutral
            state.content = action.payload
            state.show = true;
        },

        showWarningNotifi: (state: any, action: PayloadAction<string>) => {
            state.type = NotifiType.warning
            state.content = action.payload
            state.show = true;
            
        },

        showErrorNotifi: (state: any, action: PayloadAction<string>) => {
            state.type = NotifiType.error
            state.content = action.payload
            state.show = true;
        },

    },
});

export const {hideNotifi,showSuccessNotifi,showNeuTralNotifi,showWarningNotifi,showErrorNotifi } = notificationSlice.actions;
export const notificationSelector = (state: RootState) => state.notification;
