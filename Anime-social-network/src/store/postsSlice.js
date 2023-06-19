import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const endpoint = process.env.REACT_APP_ENDPOINT || ''

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async ({ userId, limit, page, isExpanded }, { rejectWithValue }) => {
    try {
      let queryParams = ''
      if (userId) {
        queryParams += `userId=${userId}`
      }
      if (limit) {
        if (queryParams) queryParams += '&'
        queryParams += `_limit=${limit}`
      }
      if (page) {
        if (queryParams) queryParams += '&'
        queryParams += `_page=${page}`
      }
      if (isExpanded) {
        if (queryParams) queryParams += '&'
        queryParams += `_expand=user`
      }

      const response = await fetch(
        `${endpoint}/posts${queryParams ? `?${queryParams}` : ''}`
      )

      if (!response.ok) {
        throw new Error('Server error')
      }

      const data = await response.json()

      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const addPost = createAsyncThunk(
  'posts/savePost',
  async ({ postImage, postTitle, postText, userId }) => {
    try {
      const response = await fetch(`${endpoint}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          postImage,
          postTitle,
          postText,
        }),
      })
      if (!response.ok) {
        throw new Error('Server error!')
      }
      const data = await response.json()

      return data
    } catch (error) {
      throw new Error('Failed to save post!')
    }
  }
)

export const editPost = createAsyncThunk(
  'posts/editPost',
  async ({ id, postImage, postTitle, postText, userId }) => {
    try {
      const response = await fetch(`${endpoint}/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          postImage,
          postTitle,
          postText,
        }),
      })
      if (!response.ok) {
        throw new Error('Server error!')
      }
      const data = await response.json()

      return data
    } catch (error) {
      throw new Error('Failed to edit post!')
    }
  }
)

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  try {
    const response = await fetch(`${endpoint}/posts/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('Server error!')
    }

    return id
  } catch (error) {
    throw new Error('Failed to delete post!')
  }
})

const initialState = {
  posts: [],
  loading: false,
  error: null,
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action.payload
      })
      .addCase(addPost.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.loading = false
        state.posts.push(action.payload)
      })
      .addCase(addPost.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(editPost.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.loading = false
        const updatedPost = action.payload
        const index = state.posts.findIndex(
          (post) => post.id === updatedPost.id
        )
        if (index !== -1) {
          state.posts[index] = updatedPost
        }
      })
      .addCase(editPost.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false
        const deletedPostId = action.payload
        state.posts = state.posts.filter((post) => post.id !== deletedPostId)
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default postsSlice.reducer
