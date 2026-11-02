import {createSlice} from '@reduxjs/toolkit'

export const windowNotificationsSlice = createSlice({
    name: 'window-notifications',
    initialState: {
        name: '',
    },
    reducers: {
        setNotification: (state, {payload}) => {
            state.name = payload;
        }
    },
});

export const {setNotification} = windowNotificationsSlice.actions;
export default windowNotificationsSlice.reducer;