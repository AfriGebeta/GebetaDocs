// src/redux/store.js
import {configureStore} from "@reduxjs/toolkit";
import {combineReducers} from 'redux';
import thunk from 'redux-thunk';
import playGroundReducer from "./reducers/playgroundSlice"
import tokenReducer from "./reducers/tokenSlice"

const rootReducer = combineReducers({
   playground : playGroundReducer,
   token : tokenReducer,
})

// const persistConfig = {
//  key: 'root',
//  storage,
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
   reducer: rootReducer,
})

// export const persistor = persistStore(store)
