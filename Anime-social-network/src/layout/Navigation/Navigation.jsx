import React from 'react'
import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

import PersonIcon from '@mui/icons-material/Person'
import ArticleIcon from '@mui/icons-material/Article'

import s from './Navigation.module.scss'

function Navigation() {
  const { user } = useSelector((state) => state.user)

  return (
    <div className={s.navigation}>
      <div className={s.user}>
        <Link to="/profile">
          <div className={s.name}>{user.name ? user.name : user.email}</div>
        </Link>
        <Link to="/profile">
          {user.avatar && (
            <div className={s.imageWrapper}>
              <img className="fill" src={user.avatar} alt="" />
            </div>
          )}
        </Link>
      </div>
      <Link to="/feed" className={s.link}>
        <ArticleIcon /> Feed
      </Link>
      <Link to="/friends" className={s.link}>
        <PersonIcon /> Friends
      </Link>
    </div>
  )
}

export default Navigation
