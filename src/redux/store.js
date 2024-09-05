// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit'
import themeSlice from './themeSlice'
import usersSlice from './usersSlice'

const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    users: usersSlice.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware()
})

export default store
