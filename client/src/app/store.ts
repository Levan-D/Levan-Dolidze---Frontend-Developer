/** @format */

import { configureStore } from "@reduxjs/toolkit"
import getDateReducer from "../slice/appSlice"

export const store = configureStore({
  reducer: {
    getData: getDateReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["data/Get/fulfilled", "data/Get/rejected"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: ["items.dates"],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
