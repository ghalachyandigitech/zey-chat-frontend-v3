import {createSlice} from '@reduxjs/toolkit';

function defaults(state){
    state.status = 0;
    state.messageFlag = 0;
    state.requestFlag = 0;
    state.name = '';
    state.userEmail = '';
    state.profileImage = '';
    state.dashboardImage = '';
    state.partnerRequest = 0;
    state.requests = {};
    state.transfers = {};

    return state;
}

export const counterSlice = createSlice({
    name: 'profile',
    initialState: defaults({}),
    reducers: {
        setProfile: (state, {payload}) => {
            const {userEmail, userPartner, partner} = payload;

            // state.status = payload.status;
            state.partnerRequest = partner.request;
            state.messageFlag = userPartner.messageFlag;
            state.requestFlag = userPartner.requestFlag;
            state.name = userPartner.name;
            state.userEmail = userEmail; //todo user emailn a karoxa petq chi stex
            state.profileImage = userPartner.profileImage || '';
            state.dashboardImage = partner.dashboardImage || '';
        },
        updateProfile: (state, {payload}) => {
            state.name = payload.name;
            state.userEmail = payload.email;
        },
        setProfileImage: (state, {payload}) => {
            state.profileImage = payload || '';
        },
        setDashboardImage(state, {payload}){
            state.dashboardImage = payload || '';
        },
        setStatus: (state, {payload}) => {
            state.status = payload;
        },
        setPartnerRequest: (state, {payload}) => {
            state.partnerRequest = payload;
        },
        updateFlag: (state, {payload}) => {
            const {flagName, flagValue} = payload;
            state[flagName] = flagValue;
        },
        setRequests: (state, {payload}) => {
            state.requests = payload;
        },
        setRequest: (state, {payload}) => {
            state.requests[payload] = 1
        },
        deleteRequest: (state, {payload}) => {
            delete state.requests[payload];
        },
        deleteRequests: (state) => {
            state.requests = {};
        },
        setTransfers: (state, {payload}) => {
            state.transfers = payload;
        },
        setTransfer: (state, {payload}) => {
            state.transfers[payload.chatId] = payload
        },
        deleteTransfer: (state, {payload}) => {
            delete state.transfers[payload];
        },
        deleteTransfers: (state) => {
            state.transfers = {};
        },
        deleteProfile: () => {
            defaults({});
        }
    },
});

export const {setUser, setUserPartner, setProfile,
    setRequests, setRequest, deleteRequest, deleteRequests,
    setTransfer, setTransfers, deleteTransfer, deleteTransfers,
    setPartnerRequest,
    setStatus, updateProfile, updateFlag, setProfileImage, setDashboardImage,
    deleteProfile} = counterSlice.actions;
export default counterSlice.reducer;