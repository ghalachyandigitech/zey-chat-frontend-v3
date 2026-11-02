import {createSlice} from '@reduxjs/toolkit'

export const flashPopUpSlice = createSlice({
    name: 'flash-pop-up',
    initialState: {
        text: ''
    },
    reducers: {
        setFlashPopUp: (state, {payload}) => {
            state.text = payload;
        }
    },
});

export const {setFlashPopUp} = flashPopUpSlice.actions;
export default flashPopUpSlice.reducer;