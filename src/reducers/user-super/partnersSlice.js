import {createSlice} from '@reduxjs/toolkit'

export const partnersSlice = createSlice({
    name: 'partners',
    initialState: {
        list: [],
    },
    reducers: {
        updateAgentById: (state, {payload}) => {
            const agent = state.agents.find(i => i.userPartnerId === payload.userPartnerId);
            if(agent){
                agent.name = payload.name;
                agent.email = payload.email;
                agent.role = payload.role;
            }
        },
        updateStatusById: (state, {payload}) => {
            const partner = state.list.find(i => i._id === payload._id);
            if(partner) partner.status = payload.status;
        },
        setPartners: (state, {payload}) => { //todo karelia taki functionon anel
            state.list = payload;
        },
        setPartner: (state, {payload}) => {
            state.list.push(payload.partner);
        },
        updatePartner: (state, {payload}) => {
            const partner = state.list.find(i => i._id === payload.partner._id);
            if(partner){
                partner.name = payload.partner.name;
                partner.file = payload.partner.file;
                partner.userAdminsIds = payload.partner.userAdminsIds;
            }
        },
        deletePartner: (state, {payload}) => {
            state.list = state.list.filter(i => i._id !== payload);
        }
    },
});

export const {setPartners, setPartner, updatePartner, updateStatusById, deletePartner} = partnersSlice.actions;
export default partnersSlice.reducer;