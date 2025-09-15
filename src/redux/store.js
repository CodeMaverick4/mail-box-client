import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlicer';
import expenseReducer from "./slice/expenseSlicer";
import themeReducer from "./slice/themeSlicer";

const store = configureStore({
    reducer:{
        auth:authReducer,
        expenses: expenseReducer,
        theme:themeReducer
    }
});

export default store