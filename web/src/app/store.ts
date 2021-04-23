import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import reducer from "./rootReducer"

const middleware = [...getDefaultMiddleware({
    serializableCheck: false
})];

const store = configureStore({
    reducer,
    middleware
})

export default store
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()