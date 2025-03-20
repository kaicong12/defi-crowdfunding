import { configureStore } from '@reduxjs/toolkit'
import walletReducer from './features/walletSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      wallet: walletReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']  