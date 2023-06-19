import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { authUser } from '../../store/userSlice'

import AuthContainer from '../../components/AuthContainer'
import Input from '../../components/Input'
import Button from '../../components/Button'

import s from './AuthorizationPage.module.scss'

function AuthorizationPage() {
  const dispatch = useDispatch()
  const { isLoading } = useSelector((state) => state.user)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(authUser({ email, password }))
  }

  return (
    <AuthContainer>
      <form className={s.form} onSubmit={onSubmit}>
        <div className={s.inputs}>
          <Input
            placeholder="Your Email"
            label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Your Password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit">{isLoading ? 'Loading...' : 'Sign in'}</Button>
      </form>
    </AuthContainer>
  )
}

export default AuthorizationPage
