import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice"
import welcomeReducer from './welcome'
import orderReducer from "./order";

 const rootReducer = combineReducers({
        auth:authReducer,
        welcome:welcomeReducer,
        order:orderReducer
})

export const store = configureStore({
    reducer:rootReducer
})