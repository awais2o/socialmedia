import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import Cookies from 'js-cookie'
// import jwt from 'jsonwebtoken'

const baseUrl = import.meta.env.VITE_API_URL

// const credentials = process.env.REACT_APP_API_CREDENTIALS

const createRequest = url => ({
  method: 'GET',
  url
})

const createPostRequest = (url, data) => ({
  method: 'POST',
  url,
  body: JSON.stringify(data),
  headers: { 'Content-Type': 'application/json' }
})

const createDeleteRequest = (url, data) => ({
  method: 'DELETE',
  url,
  body: JSON.stringify(data),
  headers: { 'Content-Type': 'application/json' }
})

const createUpdateRequest = (url, data) => ({
  method: 'PUT',
  url,
  body: JSON.stringify(data),
  headers: { 'Content-Type': 'application/json' }
})

const customBaseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    // const id = Cookies.get('user_id')
    // const authtoken = Cookies.get('Authorization')
    // const payload = { user_id: id }
    // const token = jwt.sign(payload, JWT_SECRET)
    // console.log(authtoken)

    // if (authtoken) {
    //   headers.set('Authorization', `${authtoken}`)
    // }
    return headers
  }
})

// Enhance fetchBaseQuery to include response headers in the result
const baseQueryWithHeaders = async (args, api, extraOptions) => {
  const result = await customBaseQuery(args, api, extraOptions)
  if (result.meta && result.meta.response) {
    const headers = {}
    result.meta.response.headers.forEach((value, key) => {
      headers[key] = value
    })
    // Extend the result with headers
    console.log({ headers })
    return { ...result, headers }
  }
  return result
}

export const GlobalApi = createApi({
  reducerPath: 'GlobalApi',
  baseQuery: baseQueryWithHeaders,
  endpoints: builder => ({
    createPost: builder.mutation({
      query: post => createPostRequest('/api/posts', post),
      invalidatesTags: ['posts']
    })
  })
})

export const { useCreatePostMutation } = GlobalApi
