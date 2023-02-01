import { configureStore } from '@reduxjs/toolkit'
import roomReducer from './roomReducer/roomReducer'
import userReducer from './userReducer/userReducer'
import toggleReducer from './toggleReducer/toggleReducer'
import locationReducer from './locationReducer/locationReducer'
import countryReducer from './countryReducer/countryReducer'
const store = configureStore({
    reducer: {
        roomReducer,
        userReducer,
        locationReducer,
        toggleReducer,
        countryReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store