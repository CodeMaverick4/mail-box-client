import { createSlice } from "@reduxjs/toolkit";


const authSlicer = createSlice({
    name: 'auth',
    // initialState: {
    //     isLoggedIn: localStorage.getItem('user') ? true : false,
    //     user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    //     token: localStorage.getItem('token') || null
    // },
    initialState: {
        isLoggedIn: false,
        user: null,
        token: null
    },
    reducers: {
        onReload:(state,action)=>{
            state.user = action.payload.user 
            state.token = action.payload.token;
            state.isLoggedIn = action.payload.isLoggedIn;
        },
        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.user = null
            state.token = null            
            state.isLoggedIn = false;
        }
    }
});

export const {onReload, login, logout } = authSlicer.actions
export default authSlicer.reducer