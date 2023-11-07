import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice"
import welcomeReducer from './welcome'

 const rootReducer = combineReducers({
        auth:authReducer,
        welcome:welcomeReducer
})

export const store = configureStore({
    reducer:rootReducer
})