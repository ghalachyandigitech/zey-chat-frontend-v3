import {createSlice} from '@reduxjs/toolkit'

function companionUnreadRangeToObject(companionUnread){
    const companionUnreadObject = {};
    for(let i = 0; i < companionUnread.length; i+= 2){
        const [id, status] = companionUnread.slice(i, i+2);
        companionUnreadObject[id] = status*1;
    }

    return companionUnreadObject;
}


export const chatsUnreadSlice = createSlice({
    name: 'chats-unread',
    initialState: {
        chats: {}
    },
    reducers: {
        setChatUnread(state, {payload}){
            const {_id, companionUnread} = payload;

            state.chats[_id] = companionUnreadRangeToObject(companionUnread);
        },
        setCompanionUnread: (state, {payload}) => {
            const {_id, id, status} = payload;
            const chat = state.chats[_id];
            if(chat) chat[id] = status;
        },
        deleteCompanionUnread: (state, {payload}) => {
            const chat = state.chats[payload];
            if(chat) state.chats[payload] = {};
        },
        updateCompanionUnread: (state, {payload}) => {
            const {_id, id, status} = payload;
            const chat = state.chats[_id];
            if(chat) payload.messageIds.forEach(id => chat[id] = status);
        },
        deleteChatsUnread: (state) => {
            state.chats = {};
        }
    },
});

export const {setChatUnread, setCompanionUnread, deleteChatsUnread, deleteCompanionUnread, updateCompanionUnread} = chatsUnreadSlice.actions;
export default chatsUnreadSlice.reducer;