import {createSlice} from '@reduxjs/toolkit'

//todo abstract role
export const userSuperSlice = createSlice({
    name: 'user-super',
    initialState: {
        _id: '',
        role: 0
    },
    reducers: {
        setUserSuper: (state, {payload}) => {
            state._id = payload._id;
        }
    },
});

export const {setUserSuper} = userSuperSlice.actions;
export default userSuperSlice.reducer;