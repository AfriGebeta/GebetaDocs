// redux/store.js
"use client"
import {configureStore} from "@reduxjs/toolkit";
import {combineReducers} from 'redux';
import playGroundReducer from "./reducers/playgroundSlice";
import tokenReducer from "./reducers/tokenSlice";

const rootReducer = combineReducers({
    playground: playGroundReducer,
    token: tokenReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});