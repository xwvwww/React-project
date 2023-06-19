import React from 'react'
import { useSelector } from 'react-redux'

import Button from '../../components/Button'
import PostsGrid from '../../components/PostsGrid'

import s from './ProfilePage.module.scss'

import { Link } from 'react-router-dom'

function ProfilePage() {
  const { user } = useSelector((state) => state.user)

  return (
    <div className={s.profilePage}>
      <div className={s.container}>
        {user.avatar && (
          <div className={s.imageWrapper}>
            <img className="fill" src={user.avatar} alt="" />
          </div>
        )}
        <div className={s.userInfo}>
          <div className={s.name}>{user.name ? user.name : user.email}</div>
          <div className={s.description}>
            {user.description ? user.description : ''}
          </div>
          <Button>Follow</Button>
        </div>
        <Link to="/settings" className={s.link}>
          Settings
        </Link>
      </div>
      <PostsGrid
        allUsersPosts={false}
        userId={user.id}
        showFeedElements={false}
      />
    </div>
  )
}

export default ProfilePage


