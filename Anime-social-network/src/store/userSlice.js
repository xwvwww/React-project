import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const endpoint = process.env.REACT_APP_ENDPOINT || ''

export const authUser = createAsyncThunk(
  'user/authUser',
  async function ({ email, password }, { rejectWithValue }) {
    try {
      const response = await fetch(
        `${endpoint}/users?email=${email}&password=${password}`
      )

      if (!response.ok) {
        throw new Error('Server error!')
      }

      const data = await response.json()

      if (data.length < 1) {
        throw new Error('There is no such user!')
      }

      localStorage.setItem('userEmail', email)
      localStorage.setItem('userPassword', password)

      return data[0]
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async function ({ email, password }, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(`${endpoint}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error('Server error!')
      }

      const data = await response.json()

      dispatch(authUser({ email, password }))

      return data[0]
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const updateUserData = createAsyncThunk(
  'user/updateUserData',
  async function (
    { avatar, name, description, email },
    { rejectWithValue, getState }
  ) {
    const user = getState().user.user

    try {
      const userBody = {}

      if (avatar) {
        userBody.avatar = avatar
      }
      if (name) {
        userBody.name = name
      }
      if (description) {
        userBody.description = description
      }
      if (email) {
        userBody.email = email
      }

      const userDataResponse = await fetch(`${endpoint}/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userBody),
      })

      if (!userDataResponse.ok) {
        throw new Error('Server error!')
      }

      return userDataResponse.json()
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(`${endpoint}/users`)
      if (!response.ok) {
        throw new Error('Server error!')
      }
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isLoading: false,
    isError: false,
    error: '',
    id: null,
    name: '',
    allUsers: [],
  },
  reducers: {
    // Всегда синхронные
    // state иммутабельный
    logOut(state) {
      state.user = null
      localStorage.setItem('userEmail', '')
      localStorage.setItem('userPassword', '')
    },
    setAllUsers(state, action) {
      state.allUsers = action.payload
    },
  },
  extraReducers: {
    [authUser.pending]: (state) => {
      state.isLoading = true
    },
    [authUser.rejected]: (state, action) => {
      state.isLoading = false
      state.isError = true
      state.error = action.payload
    },
    [authUser.fulfilled]: (state, action) => {
      state.isLoading = false
      state.isError = false
      state.error = ''
      state.user = action.payload
    },
    [updateUserData.pending]: (state) => {
      state.isLoading = true
    },
    [updateUserData.rejected]: (state, action) => {
      state.isLoading = false
      state.isError = true
      state.error = action.payload
    },
    [updateUserData.fulfilled]: (state, action) => {
      state.isLoading = false
      state.isError = false
      state.error = ''
      state.user = action.payload
      localStorage.setItem('userEmail', action.payload.email)
    },
    [registerUser.pending]: (state) => {
      state.isLoading = true
    },
    [registerUser.rejected]: (state, action) => {
      state.isLoading = false
      state.isError = true
      state.error = action.payload
    },
    [registerUser.fulfilled]: (state, action) => {
      state.isLoading = false
      state.isError = false
      state.error = ''
      state.user = action.payload
    },
    [getAllUsers.pending]: (state) => {
      state.isLoading = true
    },
    [getAllUsers.rejected]: (state, action) => {
      state.isLoading = false
      state.isError = true
      state.error = action.payload
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.isLoading = false
      state.isError = false
      state.error = ''
      state.allUsers = action.payload
    },
  },
})

export const { logOut } = userSlice.actions

export default userSlice.reducer
