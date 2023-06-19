import { React, useState } from 'react'

import { useSnackbar } from 'notistack'

import Input from '../../components/Input'
import Button from '../../components/Button'

import s from './SettingsPage.module.scss'

import { useDispatch, useSelector } from 'react-redux'

import { logOut, updateUserData } from '../../store/userSlice'

function SettingsPage() {
  const dispatch = useDispatch()

  const { isLoading } = useSelector((state) => state.user)

  const { user } = useSelector((state) => state.user)

  const [email, setEmail] = useState(user.email || '')
  const [avatar, setAvatar] = useState(user.avatar || '')
  const [name, setName] = useState(user.name || '')
  const [description, setDescription] = useState(user.description || '')

  const { enqueueSnackbar } = useSnackbar()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(updateUserData({ email, avatar, name, description }))

    enqueueSnackbar('Data updated', { variant: 'success' })
  }

  const handleLogOut = (e) => {
    e.preventDefault()

    dispatch(logOut())

    enqueueSnackbar('Logged out', { variant: 'info' })
  }

  return (
    <div className={s.SettingsPage}>
      <div className={s.container}>
        <div className={s.title}>Settings</div>
        <form className={s.form} onSubmit={onSubmit}>
          <Input
            label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit">{isLoading ? 'Loading...' : 'Save'}</Button>
        </form>
        <form className={s.form} onSubmit={onSubmit}>
          <Input
            label="Avatar"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
          <Button type="submit">{isLoading ? 'Loading...' : 'Save'}</Button>
        </form>
        <form className={s.form} onSubmit={onSubmit}>
          <Input
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button type="submit">{isLoading ? 'Loading...' : 'Save'}</Button>
        </form>
        <form className={s.form} onSubmit={onSubmit}>
          <Input
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button type="submit">{isLoading ? 'Loading...' : 'Save'}</Button>
        </form>
        <Button className={s.button} variant="red" onClick={handleLogOut}>
          {isLoading ? 'Loading...' : 'Log out'}
        </Button>
      </div>
    </div>
  )
}

export default SettingsPage
