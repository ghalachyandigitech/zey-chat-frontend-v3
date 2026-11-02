import {createSlice} from '@reduxjs/toolkit'
import {getBrowser, getPlatform} from "../../helpers/stringHelper";

function defaults(state){
    state.timer = 0;
    state.incoming = [];
    state.assigned = [];
    state.served = [];
    state.active = [];
    state.idle = [];

    return state;
}

export const visitorsSlice = createSlice({
    name: 'visitors',
    initialState: defaults({}),
    reducers: {
        setVisitors: (state, {payload}) => {
            for(const type of ['incoming', 'assigned', 'served', 'active', 'idle']){
                payload[type].forEach(visitor => {
                    visitor.platform = getPlatform(visitor.userAgent);
                    visitor.browser = getBrowser(visitor.userAgent);
                });

                state[type] = payload[type]
            }
        },

        updateVisitor: (state, {payload}) => {
            for(const type of ['incoming', 'assigned', 'served', 'active', 'idle']){
                const visitor = state[type].find(i => i._id === payload);
                if(visitor){
                    state[type] = state[type].filter(i => i._id !== payload);
                    state[type] = visitor;

                    break;
                }
            }
        },
        deleteVisitor: (state, {payload}) => {
            for(const type of ['incoming', 'assigned', 'served', 'active', 'idle']){
                state[type] = state[type].filter(i => i._id !== payload)
            }
        },
        setVisitor: (state, {payload}) => {
            const {visitor, role} = payload;
            visitor.platform = getPlatform(visitor.userAgent);
            visitor.browser = getBrowser(visitor.userAgent);

            state[role].push(visitor)
        },
        updateVisitorsTimer: (state) => {
            state.timer++;
        },
        deleteVisitors: (state) => {
            defaults(state);
        }
    },
});

export const {setVisitors, deleteVisitor, setVisitor, updateVisitorsTimer, deleteVisitors, updateVisitor} = visitorsSlice.actions;
export default visitorsSlice.reducer;