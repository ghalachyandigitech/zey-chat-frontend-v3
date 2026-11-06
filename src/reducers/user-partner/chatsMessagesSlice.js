import {createSlice} from '@reduxjs/toolkit'
import {DATE_OPTIONS, REG_EXP_URL_DETECT} from "../../Constants";

function messagesRangeToArray(messages){
    const messagesArray = [];
    for(let i = 0; i < messages.length; i += 5) {
        if(messages.slice(i, i + 5).length !== 5) break;

        const [id, userId, message, file, date] = messages.slice(i, i + 5);
        messagesArray.push({id, userId, message, file, date});
    }

    return messagesArray;
}

export function createMessage({id, hashId, userId, message, file, date}, companionId, authUserPartnerId, logUsers){
    if(!userId){
        const [userPartnerId, action] = message.split('_');
        message = userPartnerId === authUserPartnerId ? `you ${action}` : `${logUsers[userPartnerId]} ${action}`;
    }

    const item = {
        id,
        userPartnerId: userId,
        text: message.split(REG_EXP_URL_DETECT),
        file: [file.split('.').reverse()[0], file],
        date: date ? new Date(date).toLocaleTimeString(...DATE_OPTIONS) : '',
        dateFull: date ? Date.parse(new Date(date).toLocaleString()) : '',
        side: !userId ? 'center' : userId === companionId ? 'left': 'right'
    };

    hashId && (item.hashId = hashId);

    return item;
}

function createMessagesPage(messages, companionId, authUserPartnerId, logUsers){
    if(typeof messages[0] !== 'object') messages = messagesRangeToArray(messages);
    else messages = messages.reverse();

    return messages.map(message => createMessage(
        message, companionId, authUserPartnerId, logUsers
    ));
}

export const chatsMessagesSlice = createSlice({
    name: 'chats-messages',
    initialState: {
        logUsers: {},
        list: {}
    },
    reducers: {
        setChatMessage(state, {payload}){
            const {_id, authUserPartnerId, message} = payload;

            Object.values(state.list).forEach(chat => {
                if(chat._id === _id){
                    chat.messages[0].push(createMessage(message, chat.companionId, authUserPartnerId, state.logUsers));
                }
            });
        },
        setMessagesPage: (state, {payload}) => {
            let {authUserPartnerId, _id, messages, ended} = payload;

            ['served', 'internals', 'views'].forEach(collection => {
                const chat = state.list[collection+_id];
                if(chat && chat.pageLoad){
                    chat.messages[0] = createMessagesPage(messages, chat.companionId, authUserPartnerId, state.logUsers)
                        .concat(chat.messages[0]);
                    chat.messages[1] = ended;
                    chat.pageLoad = false;
                }
            });
        },
        updateMessageByHash(state, {payload}){
            const {_id, authUserPartnerId, message, hashId} = payload;

            ['served', 'internals', 'views'].forEach(collection => {
                const chat = state.list[collection+_id];
                if(chat){
                    const messages = chat.messages[0];
                    for(let i = messages.length-1; i >= 0; i--){
                        if(messages[i].hashId === hashId){
                            messages[i] = createMessage(message, chat.companionId, authUserPartnerId, state.logUsers);
                            break;
                        }
                    }
                }
            });
        },
        setChatMessages: (state, {payload}) => {
            let {chatMessages, messages, collection, authUserPartnerId} = payload;

            if(collection === 'served') {
                const ended = Object.entries(state.list).find(([i, v]) => v.companionId === chatMessages.companionId && i.includes('ended'));
                if(ended){
                    chatMessages.messages[0] = ended[1].messages[0];
                    delete state.list[ended[0]];
                }
            }

            chatMessages.messages[0] = createMessagesPage(messages, chatMessages.companionId, authUserPartnerId, state.logUsers);

            state.list[collection+chatMessages._id] = chatMessages;
        },
        deleteChatMessages(state, {payload}){
            const {collection, _id} = payload;
            if(collection){
                delete state.list[collection+_id];
            }else{
                ['served', 'internals'].forEach(collection => delete state.list[collection+_id]);
            }
        },
        setPageLoad: (state, {payload}) => {
            const {_id, collection} = payload;

            const chat = state.list[collection+_id];
            if(chat) chat.pageLoad = true;
        },
        setUnread(state, {payload}){
            const [_id, unread] = payload;

            ['internals', 'served', 'waiting'].forEach(collection => {
                const chat = state.list[collection+_id];
                if(chat) chat.unread = unread === 0 ? 0 : ++chat.unread;
            });
        },
        endChatMessages(state, {payload}){
            Object.entries(state.list).forEach(([index, chatMessages]) => {
                if(chatMessages._id === payload && (index.includes('waiting') || index.includes('served'))){
                    state.list['ended'+payload] = chatMessages;
                    delete state.list[index]
                }
            });
        },
        setCompanionTyping: (state, {payload}) => {
            const {_id, typing} = payload;

            ['served', 'views'].forEach(collection => {
                const chat = state.list[collection+_id];
                if(chat) chat.companionTyping = typing;
            });
        },
        setLogUser: (state, {payload}) => {
            const [userPartnerId, name] = payload;
            if(name) state.logUsers[userPartnerId] = name;
        },
        deleteChatsMessages: (state) => {
            state.list = {};
        }
    },
});

export const {setUnread, setChatMessages, setCompanionTyping, setCompanionUnread, updateCompanionUnread, setPageLoad,
    setChatMessage, deleteChatMessages, endChatMessages, setLogUser, updateMessageByHash, setMessagesPage, deleteChatsMessages} = chatsMessagesSlice.actions;
export default chatsMessagesSlice.reducer;