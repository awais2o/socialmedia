// src/features/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    value: false
  },
  reducers: {
    updateTheme: (state, action) => {
      state.value = !state.value
    }
  }
})

export const { updateTheme } = themeSlice.actions

export default themeSlice
