import { createSlice } from '@reduxjs/toolkit'

export const userAdminsSlice = createSlice({
    name: 'user-admins',
    initialState: {
        list: [],
    },
    reducers: {
        updateUserAdminById: (state, {payload}) => {
            const userAdmin = state.list.find(i => i._id === payload._id);
            if(userAdmin){
                userAdmin.name = payload.name;
                userAdmin.email = payload.email;
                userAdmin.phone = payload.phone;
                userAdmin.companyName = payload.companyName;
            }
        },
        setUserAdmins: (state, {payload}) => {
            state.list = payload;
        },
        setUserAdmin: (state, {payload}) => {
            state.list.push(payload);
        },
        deleteUserAdmin: (state, {payload}) => {
            state.list = state.list.filter(i => i._id !== payload);
        }
    },
});

export const {setUserAdmins, setUserAdmin, updateUserAdminById, deleteUserAdmin} = userAdminsSlice.actions;
export default userAdminsSlice.reducer;