import {createSlice} from '@reduxjs/toolkit'

function set(state, payload){
    const {_id, userPartnerId, userPartnerName} = payload;

    if(!state.userPartners[userPartnerId]){
        state.userPartners[userPartnerId] = {name: userPartnerName, chats: {}};
    }

    state.userPartners[userPartnerId].chats[_id] = payload;
}

export const chatsViewSavedSlice = createSlice({
    name: 'chatsViewSaved',
    initialState: {
        userPartners: {}
    },
    reducers: {
        setView: (state, {payload}) => {
            set(state, payload);
        },
        deleteChatView: (state, {payload}) => {
            const {chatId, userPartnerId} = payload;

            const userPartner = state.userPartners[userPartnerId];
            if(userPartner){
                delete userPartner.chats[chatId];
                if(!userPartner.chats.length) delete state.userPartners[userPartnerId]
            }
        },
        updateChatView: (state, {payload}) => {
            Object.values(state.userPartners).forEach(({chats}) => {
                Object.values(chats).forEach(({_id, companionName}) => {
                    if(_id === payload._id){
                        set(state, {...payload, companionName});
                    }
                });
            });
        },
        deleteChatsViewSaved: (state) => {
            state.userPartners = {};
        },
    },
});

export const {setView, deleteChatView, updateChatView, deleteChatsViewSaved} = chatsViewSavedSlice.actions;
export default chatsViewSavedSlice.reducer;