import {createSlice} from '@reduxjs/toolkit'

function open(state, {_id = '', companionId = '', collection}){
    state._id = _id;
    state.companionId = companionId;
    state.collection = collection
}

function close(state){
    state._id = '';
    state.companionId = '';
    state.collection = '';

    return state;
}

export const chatPopupSlice = createSlice({
    name: 'chat-popup',
    initialState: close({}),
    reducers: {
        chatPopupOpen: (state, {payload}) => {
            open(state, payload);
        },
        chatPopupClose: state => {
            close(state);
        },
        endChatPopUp(state, {payload}){
            if (state._id === payload && state.collection !== 'views') state.collection = 'ended';
        },
        closeIfOpened(state, {payload}){
            const {collection, _id} = payload;
            if(state._id === _id && (collection || state.collection !== 'views')) close(state)
        },
        openAwaitingChat(state, {payload}){
            if(payload._id === state._id || (payload.companionId === state.companionId && state.collection !== 'views')){
                open(state, payload);
            }
        },
        awaitChat(state, {payload}){
            open(state, payload);
        }
    },
});

export const {_id} = chatPopupSlice.getInitialState();
export const {chatPopupOpen, chatPopupClose, openAwaitingChat, endChatPopUp, awaitChat, closeIfOpened} = chatPopupSlice.actions;
export default chatPopupSlice.reducer;