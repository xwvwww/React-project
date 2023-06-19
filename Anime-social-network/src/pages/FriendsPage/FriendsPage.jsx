import { React } from 'react'

import UsersContainer from '../../components/UsersContainer'

import s from './FriendsPage.module.scss'

function FriendsPage() {
  return (
    <UsersContainer isFriends={true}>
      <div className={s.friendsPage}>
        <div className={s.container}>Friends page</div>
      </div>
    </UsersContainer>
  )
}

export default FriendsPage
