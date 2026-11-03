import {socket, connectSocket} from "../../Socket";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {openAwaitingChat, closeIfOpened, endChatPopUp, chatPopupClose} from "../../reducers/user-partner/chatPopupSlice";
import {setNotification} from "../../reducers/user-partner/windowNotificationsSlice";
import {setRequests, setRequest, deleteRequest, deleteRequests, setTransfer, setTransfers, deleteTransfer, deleteTransfers, setStatus} from "../../reducers/user-partner/profileSlice";
import {setChatMessages, setUnread, deleteChatMessages, endChatMessages, setChatMessage, setLogUser, updateMessageByHash, setMessagesPage, deleteChatsMessages, setCompanionTyping} from "../../reducers/user-partner/chatsMessagesSlice";
import {setFlashPopUp} from "../../reducers/flashPopUpSlice";
import {setView, deleteChatView, updateChatView, deleteChatsViewSaved} from "../../reducers/user-partner/chatsViewSavedSlice";
import {deleteAgent, deleteAgents, updateStatus} from "../../reducers/user-partner/agentsSlice";
import {setCompanionUnread, setChatUnread, updateCompanionUnread, deleteCompanionUnread, deleteChatsUnread} from "../../reducers/user-partner/chatsUnreadSlice";
import {setChat, setCompanionStatus, updateUserPartnerId, setCompanionCreated, endChat, setFile, deleteChat, deleteChats, setCompanionBanUpdatedAt, setChatStatus} from "../../reducers/user-partner/chatsSlice";
import {setVisitors, setVisitor, deleteVisitor, deleteVisitors, updateVisitor} from "../../reducers/user-partner/visitorsSlice";
import {deleteVisitorBanned, setVisitorBanned} from "../../reducers/user-partner/visitorsBannedSlice";
import {DATE_OPTIONS} from "../../Constants";

const SocketController = ({config, buttonLogoutRef}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        connectSocket(config);

        function recover([chatInfo, companionStatus, messages, companionUnread, unread, companionCreated], collection){
            //todo companion: status: jnjel
            const chatMessages = {
                _id: chatInfo._id,
                pageLoad: false,
                companionTyping: false,
                companionId: chatInfo.companion._id,
                unread: unread,
                messages: [[], messages[1]],
            };

            const chat = {
                _id: chatInfo._id,
                collection: collection ? collection : ['', 'waiting', 'served', 'served', 'internals'][chatInfo.status],
                status: chatInfo.status,
                file: chatInfo.file,
                draft: '',
                companionId: chatInfo.companion._id,
                companionName: chatInfo.companion.name,
                companionCreated: companionCreated, //todo backendi vra 0 poxel datark toxov ''
                companionBanUpdatedAt: chatInfo.companion.banExpire ? new Date(chatInfo.companion.banExpire).toLocaleDateString(...DATE_OPTIONS) : '',
                companionStatus: companionStatus, //todo voch mi tex chi ogtagorcvum es pahin,
                userPartnerId: chatInfo.user._id,
                userPartnerName: chatInfo.user.name,
                widget: chatInfo.widget
            };

            Object.entries(chatInfo.logUsers).forEach(logUser => dispatch(setLogUser(logUser))); //todo backendic kdzvi ete petq lini

            dispatch(setChatMessages({
                chatMessages: chatMessages,
                collection: chat.collection,
                messages: messages[0],
                authUserPartnerId: socket.auth.userId
            }));
            dispatch(setChatUnread({_id: chat._id, companionUnread}));
            dispatch(setChat({chat}));
            dispatch(openAwaitingChat(chat));
        }

        socket.on('transfer.cancel', _id => {
            dispatch(setChatStatus({_id, status: 2}));
        });

        socket.on('transfer.new.set', data => {
            dispatch(setTransfer(data));
        });

        socket.on('transfer.new.delete', _id => {
            dispatch(deleteTransfer(_id));
        });

        socket.on('chats.view', (data) => {
            const [chatInfo] = data;

            dispatch(setView({
                _id: chatInfo._id,
                userPartnerId: chatInfo.user._id,
                userPartnerName: chatInfo.user.name,
                companionName: chatInfo.companion.name
            }));

            recover(data, 'views');
        });

        socket.on('visitors.update', ([visitor, role]) => {
            if(role === ''){
                dispatch(updateVisitor(visitor));
            }else{
                dispatch(deleteVisitor(visitor._id));
                if(role !== 'disconnected-visitors') dispatch(setVisitor({visitor, role}));
            }
        });

        socket.on('permission.ban.set', ([companionBanUpdatedAt, userPartnerId, banReason, companionBanUpdatedAt1, name]) => {
            companionBanUpdatedAt = companionBanUpdatedAt ? new Date(companionBanUpdatedAt).toLocaleDateString(...DATE_OPTIONS): '';

            dispatch(setCompanionBanUpdatedAt({userPartnerId, companionBanUpdatedAt}));

            dispatch(deleteVisitorBanned({_id: userPartnerId}));
            if(companionBanUpdatedAt){
                dispatch(setFlashPopUp('visitor baned'));
                dispatch(setVisitorBanned({_id: userPartnerId, updatedAt: companionBanUpdatedAt, banReason, name: 'test'}));
            }else{
                dispatch(setFlashPopUp('visitor unbaned'));
            }
        });

        socket.on('chats.recover', (data) => {
            recover(data);
        });

        socket.on('user.update', ([agent, agents, file]) => {
            /*todo team-leads*/
            agent.visitors && dispatch(setVisitors(agent.visitors));
            agent.transfers && dispatch(setTransfers(agent.transfers.reduce((a, t) => {a[t.chatId] = t; return a}, {})));
            agent.views && agent.views.forEach(view => dispatch(setView({
                _id: view._id,
                userPartnerId: view.user._id,
                userPartnerName: view.user.name,
                companionName: view.companion.name
            })));
            /*todo team-leads*/
            dispatch(setStatus(agent.status));
            agent.requests && dispatch(setRequests(agent.requests.reduce((acc, _id) => {acc[_id] = 1; return acc}, {})));
        });

        socket.on('chats.status', ([companionStatus, userPartnerId, _id, companionCreated]) => {
            if(userPartnerId === socket.auth.userId) return;

            dispatch(setCompanionStatus({_id, companionStatus}));
            if(companionCreated !== undefined) dispatch(setCompanionCreated({_id, companionCreated}));
        });

        socket.on('message.new.log', ([_id, [id, , text, , date], userPartnerId, name]) => {
            dispatch(setLogUser([userPartnerId, name]));
            dispatch(setChatMessage({
                _id,
                authUserPartnerId: socket.auth.userId,
                message: {id, userId: '', message: text, file: '', date}
            }));
        });

        socket.on('chats.views.list.update', ([chatId, oldUserId, {_id, name}]) => {
            dispatch(updateUserPartnerId({_id: chatId, userPartnerId: _id}));
            dispatch(updateChatView({_id: chatId, userPartnerId: _id, userPartnerName: name}));
            dispatch(deleteChatView({chatId, userPartnerId: oldUserId}));
        });

        socket.on('message.page', ([messages, ended, _id]) => {
            dispatch(setMessagesPage({authUserPartnerId: socket.auth.userId, _id, messages, ended}));
        });

        socket.on('message.typing', ([userPartnerId, typing, chatId]) => {
            if(socket.auth.userId !== userPartnerId){
                dispatch(setCompanionTyping({_id: chatId, typing: typing}))
            }
        });

        socket.on('message.new', ([[id, userPartnerId, text, file, date], hashId, _id]) => {
            const message = {id, userId: userPartnerId, message: text, file, date};

            if(userPartnerId === socket.auth.userId){
                dispatch(updateMessageByHash({_id, message, hashId}));
                dispatch(setCompanionUnread({_id, id: message.id, status: 0}));
            }else{
                dispatch(setCompanionTyping({_id, typing: false}));
                dispatch(setChatMessage({_id, message}));
                dispatch(setUnread([_id]));
                // if(document.hidden) dispatch(setNotification('message'));
            }
        });

        socket.on('message.delivered', ([userPartnerId, _id, messageIds]) => {
            dispatch(updateCompanionUnread({_id, messageIds, status: 1}));
        });

        socket.on('message.read', ([userPartnerId, _id]) => {
            dispatch(deleteCompanionUnread(_id)); //todo ete menak visitorn a uxarku agentnern el internalin chen uxarkum
        });

        socket.on('permission.file', ([toggle, _id]) => { //todo backendum petq a darna 'chats.file.permission' hnaravora
            dispatch(setFile({_id, file : 1 + toggle}));  //todo todo backendi vra erevi status@ het tanq
        });

        socket.on('chats.end', _id => {
            dispatch(endChatPopUp(_id));
            dispatch(endChatMessages(_id));
            dispatch(endChat(_id));
        });

        socket.on('chats.delete', _id => {
            dispatch(closeIfOpened({_id}));
            dispatch(deleteChat({_id}));
            dispatch(deleteChatMessages({_id}));
        });

        socket.on('agents.update.status', ([userPartnerId, status]) => {
            if(userPartnerId === socket.auth.userId){
                status <=1 ? buttonLogoutRef.current.click() : dispatch(setStatus(status));
            } else {
                dispatch(updateStatus({userPartnerId, status}));
            }
        });

        socket.on('chats.manual.set', _id => {
            dispatch(setRequest(_id));
            // if(document.hidden) dispatch(setNotification('request'));
        });

        socket.on('chats.manual.delete', _id => { //todo route i anun@ request
            dispatch(deleteRequest(_id));
        });

        socket.on('disconnect', () => {
            dispatch(chatPopupClose());
            dispatch(deleteAgents());
            dispatch(deleteRequests());
            dispatch(deleteTransfers());
            dispatch(deleteChats());
            dispatch(deleteChatsUnread());
            dispatch(deleteChatsViewSaved());
            dispatch(setStatus(0));
            dispatch(deleteChatsMessages());
            dispatch(deleteVisitors());
        });
    }, []);
};

export default SocketController;