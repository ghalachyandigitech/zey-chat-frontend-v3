import {createSlice} from '@reduxjs/toolkit'

export const chatsSlice = createSlice({
    name: 'chats',
    initialState: {
        list:{}
    },
    reducers: {
        setChat: (state, {payload}) => {
            const {chat} = payload;

            if(chat.collection === 'served'){
                const ended = Object.values(state.list).find(i => i.companionId === chat.companionId && i.collection === 'ended');
                if(ended) delete state.list['ended'+ended._id];
            }

            delete state.list['waiting'+chat._id];

            state.list[chat.collection+chat._id] = chat;
        },
        setFile(state, {payload}){
            Object.values(state.list).forEach(chat => {
                if(chat._id === payload._id) chat.file = payload.file;
            });
        },
        setChatStatus(state, {payload}){
            Object.values(state.list).forEach(chat => {
                if(chat._id === payload._id) chat.status = payload.status;
            });
        },
        setCompanionCreated(state, {payload}){
            Object.values(state.list).forEach(chat => {
                if(chat._id === payload._id) chat.companionCreated = payload.companionCreated;
            });
        },
        setCompanionStatus(state, {payload}){
            Object.values(state.list).forEach(chat => {
                if(chat._id === payload._id) chat.companionStatus = payload.companionStatus;
            });
        },
        setDraft: (state, {payload}) => {
            const {collection, _id, draft} = payload;

            const chat = state.list[collection+_id];
            if(chat) chat.draft = draft;
        },
        endChat(state, {payload}){
            Object.values(state.list).forEach(chat => {
                if(chat._id === payload){
                    chat.status = 5;
                    if(['served', 'waiting'].includes(chat.collection)){
                        state.list['ended'+chat._id] = chat;
                        chat.collection = 'ended';
                        chat.companionCreated = 0;
                        delete state.list['served'+payload];
                    }
                }
            });
        },
        updateUserPartnerId(state, {payload}){
            const {_id, userPartnerId} = payload;
            const chat = state.list['views'+_id];
            if(chat) chat.userPartnerId = userPartnerId;
        },
        deleteChat(state, {payload}){
            const {collection, _id} = payload;
            if(collection){
                delete state.list[collection+_id];
            }else{
                ['served', 'internals'].forEach(collection => delete state.list[collection+_id]);
            }
        },
        deleteChats: (state) => {
            state.list = {};
        }
    },
});

export const {setChat, setCompanionStatus, setChatStatus, setCompanionCreated, endChat, setFile, deleteChat, deleteChats, setDraft, updateUserPartnerId} = chatsSlice.actions;
export default chatsSlice.reducer;