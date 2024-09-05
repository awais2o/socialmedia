// src/features/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit'

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    value: {}
  },
  reducers: {
    setUser: (state, action) => {
      const user = action.payload
      state.value = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        photoURL: user.photoURL,
        providerId: user.providerId
      }
    },
    clearUser: state => {
      state.value = null
    }
  }
})

export const { setUser, clearUser } = usersSlice.actions

export default usersSlice
