import {createSlice} from '@reduxjs/toolkit'

export const agentsSlice = createSlice({
    name: 'agents',
    initialState: {
        list: {},
    },
    reducers: {
        updateAgentById: (state, {payload}) => {
            const {userPartnerId, name, email, role, limit} = payload;

            const agent = state.list[userPartnerId];
            if(agent){
                agent.name = name;
                agent.email = email;
                agent.role = role || agent.role;
                agent.limit = limit;
            }
        },
        setAgent: (state, {payload}) => {
            state.list[payload.userPartnerId] = payload;
        },
        deleteAgent: (state, {payload}) => {
            delete state.list[payload];
        },
        deleteAgents: (state) => {
            state.list = {};
        },
        setAgents: (state, {payload}) => {
            state.list = payload;
        },
        addAgents: (state, {payload}) => {
            state.list.push(payload);
        },
        updateStatus: (state, {payload}) => {
            const {status, userPartnerId} = payload;

            const agent = state.list[userPartnerId];
            if(agent) agent.status = status;
        }
    },
});

export const {setAgents, setAgent, deleteAgent, addAgents, updateAgentById, deleteAgents, updateStatus} = agentsSlice.actions;
export default agentsSlice.reducer;