import {createSlice} from '@reduxjs/toolkit'

export const transcriptSlice = createSlice({
    name: 'transcript',
    initialState: {
        rating: '--',
        createdAt: '',
        messages: []
    },
    reducers: {
        updateShortcutById: (state, {payload}) => {
            const shortcut = state.list.find(i => i._id === payload._id);
            if(shortcut){
                shortcut.tag = payload.tag;
                shortcut.message = payload.message;
            }
        },
        setTranscript: (state, {payload}) => {
            state.rating = payload.rating;
            state.createdAt = payload.createdAt;
            state.messages = payload.messages;
            state.logUsers = payload.logUsers;
        },
        addShortcuts: (state, {payload}) => {
            state.list.push(payload);
        },
        deleteMessageFile: (state, {payload}) => {
            state.messages.forEach(message => {
                if(message._id === payload){
                    message.file = '';
                }
            })
        }
    },
});

export const {setTranscript, deleteMessageFile, updateShortcutById, deleteShortcuts} = transcriptSlice.actions;
export default transcriptSlice.reducer;