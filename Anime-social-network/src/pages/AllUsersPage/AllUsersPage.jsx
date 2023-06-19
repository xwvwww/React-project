import { React, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import Button from '../../components/Button'
import UsersContainer from '../../components/UsersContainer'

import s from './AllUsersPage.module.scss'

import { getAllUsers } from '../../store/userSlice'

function AllUsersPage() {
  const dispatch = useDispatch()
  const allUsers = useSelector((state) => state.user.allUsers)
  const currentUser = useSelector((state) => state.user.user)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  return (
    <UsersContainer isFriends={false}>
      <div className={s.allUsersPage}>
        {allUsers
          .filter((user) => user.id !== currentUser.id)
          .map((user) => (
            <div key={user.id} className={s.userCard}>
              <div className={s.imageWrapper}>
                <img src={user.avatar} alt="" className="fill" />
              </div>
              <div className={s.userInfo}>
                <div className={s.name}>{user.name}</div>
                <div className={s.email}>{user.email}</div>
              </div>
              <Button>{user.isFollowing ? 'Unfollow' : 'Follow'}</Button>
            </div>
          ))}
      </div>
    </UsersContainer>
  )
}

export default AllUsersPage
