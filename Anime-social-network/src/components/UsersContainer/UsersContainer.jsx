import React from 'react'

import s from './UsersContainer.module.scss'

import { Link } from 'react-router-dom'

function UsersContainer({ children, isFriends }) {
  return (
    <div className={s.usersContainer}>
      <div className={s.container}>
        <div className={s.panel}>
          <div className={s.title}>Users</div>
          <div className={s.tab}>
            <Link
              to="/all"
              className={`${s.link}  ${isFriends ? '' : s.active}`}
            >
              All
            </Link>
            <Link
              to="/friends"
              className={`${s.link}  ${isFriends ? s.active : ''}`}
            >
              Friends
            </Link>
          </div>
        </div>
        {children}
      </div>
     
    </div>
  )
}

export default UsersContainer
