import {createSlice} from '@reduxjs/toolkit'
import {USER_PARTNERS_CONFIGS} from "../../Constants";

function defaults(state){
    state.shortcuts = [];
    state.partnerId = '';
    state.userPartnerId = '';
    state.role = 0;
    state.partnerName = '';
    state.config = {};

    return state;
}

export const userPartnerSlice = createSlice({
    name: 'user-partner',
    initialState: defaults({}),
    reducers: {
        setUserPartner: (state, {payload}) => {
            const {partner, userPartner, shortcuts} = payload;
            state.partnerId = partner._id;
            state.userPartnerId = userPartner._id;
            state.role = userPartner.role;
            state.partnerName = partner.name;
            state.shortcuts = shortcuts;
            state.config = USER_PARTNERS_CONFIGS[userPartner.role];
        },
        deleteUserPartner: (state) => {
            defaults(state);
        }
    },
});

export const {setUserPartner, deleteUserPartner} = userPartnerSlice.actions;
export default userPartnerSlice.reducer;