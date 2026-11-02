import {createSlice} from '@reduxjs/toolkit'

export const shortcutSlice = createSlice({
    name: 'shortcuts',
    initialState: {
        list: [],
    },
    reducers: {
        updateShortcutById: (state, {payload}) => {
            const shortcut = state.list.find(i => i._id === payload._id);
            if(shortcut){
                shortcut.tag = payload.tag;
                shortcut.message = payload.message;
            }
        },
        setShortcuts: (state, {payload}) => {
            state.list = payload;
        },
        addShortcuts: (state, {payload}) => {
            state.list.push(payload);
        },
        deleteShortcuts: (state, {payload}) => {
            state.list = state.list.filter(i => i._id !== payload);
        }
    },
});

export const {setShortcuts, addShortcuts, updateShortcutById, deleteShortcuts} = shortcutSlice.actions;
export default shortcutSlice.reducer;