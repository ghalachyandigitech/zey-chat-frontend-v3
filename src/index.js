import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from 'react-redux';
import {configureStore} from "@reduxjs/toolkit";
import popUpSlice from "./reducers/popUpSlice";
import flashPopUpSlice from "./reducers/flashPopUpSlice";
import userReducer from "./reducers/user/userSlice";
import userSuperReducer from "./reducers/user-super/userSuperSlice";
import userPartnerReducer from "./reducers/user-partner/userPartnerSlice";
import chatPopupReducer from "./reducers/user-partner/chatPopupSlice";
import chatsReducer from "./reducers/user-partner/chatsSlice";
import chatsUnreadReducer from "./reducers/user-partner/chatsUnreadSlice";
import agentsReducer from "./reducers/user-partner/agentsSlice";
import shortcutsReducer from "./reducers/user-partner/shortcutSlice";
import widgetsReducer from "./reducers/user-partner/widgetsSlice";
import chatsMessagesReducer from "./reducers/user-partner/chatsMessagesSlice";
import chatsViewSavedReducer from "./reducers/user-partner/chatsViewSavedSlice";
import visitorsReducer from "./reducers/user-partner/visitorsSlice";
import visitorsBannedReducer from "./reducers/user-partner/visitorsBannedSlice";
import partnersReducer from "./reducers/user-super/partnersSlice";
import userAdminsReducer from "./reducers/user-super/userAdminsSlice";
import profileSlice from "./reducers/user-partner/profileSlice";
import windowNotificationsSlice from "./reducers/user-partner/windowNotificationsSlice";

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore({
    reducer: {
        profile: profileSlice,
        popUp: popUpSlice,
        flashPopUp: flashPopUpSlice,
        windowNotifications: windowNotificationsSlice,
        user: userReducer,
        userPartner: userPartnerReducer,
        userSuper: userSuperReducer,
        chatPopup: chatPopupReducer,
        chats: chatsReducer,
        chatsUnread: chatsUnreadReducer,
        agents: agentsReducer,
        shortcuts: shortcutsReducer,
        widgets: widgetsReducer,
        chatsMessages: chatsMessagesReducer,
        chatsViewSaved: chatsViewSavedReducer,
        visitors: visitorsReducer,
        visitorsBanned: visitorsBannedReducer,
        partners: partnersReducer,
        userAdmins: userAdminsReducer,
    }
});

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
