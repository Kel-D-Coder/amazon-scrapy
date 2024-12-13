import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import userReducer from './userSlice.js'

const rootReducers = combineReducers({
    user: userReducer
});

// Configuration for redux-persist
const persistConfig = {
    key: 'root', // Key for the persisted state
    storage,     // Define the storage type
};

const persistedReducer = persistReducer(persistConfig, rootReducers)
  

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export const persistor = persistStore(store);