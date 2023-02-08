/** @format */

import { configureStore } from "@reduxjs/toolkit"
import getDateReducer from "../slice/appSlice"

export const store = configureStore({
  reducer: {
    getData: getDateReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
