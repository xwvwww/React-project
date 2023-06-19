import { React, useEffect, useMemo } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { authUser } from './store/userSlice'

import AuthorizationPage from './pages/AuthorizationPage'
import FeedPage from './pages/FeedPage'
import LoadingPage from './pages/LoadingPage'
import Layout from './layout/Layout'
import RegistrationPage from './pages/RegistrationPage'
import PostCreationPage from './pages/PostCreationPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage/SettingsPage'
import FriendsPage from './pages/FriendsPage'
import SinglePostPage from './pages/SinglePostPage/SinglePostPage'
import AllUsersPage from './pages/AllUsersPage/AllUsersPage'

function Router() {
  const dispatch = useDispatch()
  const { user, isLoading } = useSelector((state) => state.user)

  const email = useMemo(() => localStorage.getItem('userEmail') || '', [user])
  const password = useMemo(
    () => localStorage.getItem('userPassword') || '',
    [user]
  )

  useEffect(() => {
    if (email && password) {
      dispatch(authUser({ email, password }))
    }
  }, [dispatch, email, password])

  const isLoadingPage = !user && isLoading && email && password
  const isAuthorizationPage = !user && !isLoading && !email && !password

  return (
    <BrowserRouter>
      <Routes>
        {isLoadingPage && <Route path="*" element={<LoadingPage />} />}
        {user && (
          <>
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<FeedPage />} />
              <Route path="feed" element={<FeedPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="create-post" element={<PostCreationPage />} />
              <Route path="friends" element={<FriendsPage />} />
              <Route path="all" element={<AllUsersPage />} />
              <Route path="/feed/:id" element={<SinglePostPage />} />
            </Route>
          </>
        )}
        {isAuthorizationPage && (
          <>
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="*" element={<AuthorizationPage />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default Router
