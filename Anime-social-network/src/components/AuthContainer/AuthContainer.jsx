import React from 'react'

import s from './AuthContainer.module.scss'

import { Link } from 'react-router-dom'

function AuthContainer({ children, isRegistration }) {
  return (
    <div className={s.authContainer}>
      <div className={s.container}>
        <div className={s.panel}>
          <div className={s.tab}>
            <Link
              to="/"
              className={`${s.link}  ${isRegistration ? '' : s.active}`}
            >
              Sign up
            </Link>
            <Link
              to="/registration"
              className={`${s.link}  ${isRegistration ? s.active : ''}`}
            >
              Register
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthContainer
