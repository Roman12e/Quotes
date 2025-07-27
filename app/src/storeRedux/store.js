import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: { isRegister: false, speed: 1, theme: 'light', language: 'en' },
    reducers: {
        setIsRegister(state, action) {
            state.isRegister = action.payload
        },
        setSpeed(state, action) {
            state.speed = action.payload
        },
        setTheme(state, action) {
            state.theme = action.payload
        },
        setLanguage(state, action) {
            state.language = action.payload
        },
        clearState(state) {
            state.isRegister = false
            state.speed = 1
            state.theme = 'light'
            state.language = 'en'
        }
    },
})

const persistedReducer = persistReducer(persistConfig, authSlice.reducer)

export const { setIsRegister, setSpeed, setTheme, setLanguage, clearState } = authSlice.actions

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})

export const clearStorageAndState = async () => {
    await AsyncStorage.clear()
    store.dispatch(clearState())
}

export const persistor = persistStore(store)
export default store