import { configureStore } from '@reduxjs/toolkit'
import themeSlice from './themeSlice'
import usersSlice from './usersSlice'
import { GlobalApi } from './GlobalApi' // Import the GlobalApi

const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    users: usersSlice.reducer,
    [GlobalApi.reducerPath]: GlobalApi.reducer // Add the API reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(GlobalApi.middleware) // Add API middleware
})

export default store
