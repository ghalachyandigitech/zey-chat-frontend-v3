import {createSlice} from '@reduxjs/toolkit'

export const popUpSlice = createSlice({
    name: 'pop-up',
    initialState: {
        name: '',
        type: 'default',
        payload: {}
    },
    reducers: {
        setPopUp: (state, {payload}) => {
            state.name = payload[0];
            state.payload = payload[1] || {};
            state.type = payload[2] || 'default';
        }
    },
});

export const {setPopUp} = popUpSlice.actions;
export default popUpSlice.reducer;