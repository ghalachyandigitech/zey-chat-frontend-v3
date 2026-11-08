import {createSlice} from '@reduxjs/toolkit'
import {DATE_OPTIONS} from "../../Constants";

export const visitorsBannedSlice = createSlice({
    name: 'visitors-banned',
    initialState: {
        list: []
    },
    reducers: {
        setVisitorsBanned: (state, {payload}) => {
            state.list = payload;
        },
        setVisitorBanned: (state, {payload}) => {
            payload.banUpdatedAt = new Date(payload.banUpdatedAt).toLocaleDateString(...DATE_OPTIONS);
            state.list.push(payload);
        },
        deleteVisitorBanned: (state, {payload}) => {
            const {_id} = payload;
            state.list = state.list.filter(i => i._id !== _id);
        }
    },
});

export const {setVisitorsBanned, setVisitorBanned, deleteVisitorBanned} = visitorsBannedSlice.actions;
export default visitorsBannedSlice.reducer;