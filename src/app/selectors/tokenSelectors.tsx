import { RootState } from '../store/store';

export const selectGetToken = (state: RootState) => state.userData.user;
