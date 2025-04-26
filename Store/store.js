import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

import authenticationReducer from '../Slices/Authentication/authenticationSlice'
import  eventReducer  from '../Slices/Event/eventSlice'

const persistConfigAuth = {
  key: 'auth',
  storage: AsyncStorage
}

const persistConfigEvent = {
  key: 'event',
  storage: AsyncStorage
}

const persistedAuthReducer = persistReducer(persistConfigAuth, authenticationReducer)
const persistedEventReducer = persistReducer(persistConfigEvent, eventReducer)

const store = configureStore({
    reducer:{
        authentication: persistedAuthReducer,
        event: persistedEventReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
          immutableCheck: false,
        }),
})

export const persistor = persistStore(store)
export default store