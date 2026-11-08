import {createSlice} from '@reduxjs/toolkit'
import {getBrowser, getPlatform} from "../../helpers/stringHelper";

function defaults(state){
    state.timer = 0;
    state.roles = {
        incoming : [10, []],
        assigned: [10, []],
        served: [10, []],
        active: [10, []],
        idle: [10, []]
    };

    return state;
}

export const visitorsSlice = createSlice({
    name: 'visitors',
    initialState: defaults({}),
    reducers: {
        setVisitors: (state, {payload}) => {
            for(const role of Object.keys(state.roles)){
                payload[role].forEach(visitor => {
                    visitor.platform = getPlatform(visitor.userAgent);
                    visitor.browser = getBrowser(visitor.userAgent);
                });

                state.roles[role][1] = payload[role];
            }
        },
        deleteVisitor: (state, {payload}) => {
            for(const role of Object.keys(state.roles)){
                state.roles[role][1] = state.roles[role][1].filter(i => i._id !== payload)
            }
        },
        setVisitor: (state, {payload}) => {
            const {visitor, role} = payload;
            visitor.platform = getPlatform(visitor.userAgent);
            visitor.browser = getBrowser(visitor.userAgent);

            state.roles[role][1].push(visitor)
        },

        updateVisitorsTimer: (state) => {
            state.timer++;
        },
        setRoleCount: (state, {payload}) => {
            state.roles[payload][0] += 10;
        },
        deleteVisitors: (state) => {
            defaults(state);
        }
    },
});

export const {setVisitors, deleteVisitor, setRoleCount, setVisitor, updateVisitorsTimer, deleteVisitors, updateVisitor} = visitorsSlice.actions;
export default visitorsSlice.reducer;