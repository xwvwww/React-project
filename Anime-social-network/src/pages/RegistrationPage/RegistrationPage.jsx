import React from 'react'
import { useState } from 'react'

import AuthContainer from '../../components/AuthContainer'
import Input from '../../components/Input'
import Button from '../../components/Button'

import { useDispatch } from 'react-redux'

import { registerUser } from '../../store/userSlice'

import s from './RegistrationPage.module.scss'
import { useNavigate } from 'react-router-dom'

function RegistrationPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(registerUser({ email, password })).then(() => {
      navigate('/')
    })
  }

  return (
    <AuthContainer isRegistration={true}>
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
          <Input
            placeholder="Confirm"
            label="Confirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        <Button type="submit">Register</Button>
      </form>
    </AuthContainer>
  )
}

export default RegistrationPage
