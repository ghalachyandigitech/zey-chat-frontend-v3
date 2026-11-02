import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        _id: '',
        email: '',
    },
    reducers: {
        setUser: (state, {payload}) => {
            state._id = payload._id;
            state.email = payload.email;
        },
        deleteUser: (state, {payload}) => {
            state._id = '';
            state.email = '';
        }
    },
});

export const {setUser, deleteUser} = userSlice.actions;
export default userSlice.reducer;