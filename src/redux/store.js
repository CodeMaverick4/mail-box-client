import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlicer';

const store = configureStore({
    reducer:{
        auth:authReducer,        
    }
});

export default store