import { configureStore } from '@reduxjs/toolkit'
import positionReducer from './positionReducer/positionReducer'
import roomReducer from './roomReducer/roomReducer'
import userReducer from './userReducer/userReducer'
export const store = configureStore({
    reducer: {
        positionReducer,
        roomReducer,
        userReducer
    }
})

export type RootState = ReturnType<typeof store.getState> 

export type AppDispatch = typeof store.dispatch