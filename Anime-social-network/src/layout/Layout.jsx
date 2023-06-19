import React from 'react'
import { Outlet } from 'react-router-dom'

import Navigation from './Navigation'

import s from './Layout.module.scss'

function Layout() {
  return (
    <div className={s.layout}>
      <Navigation />
      <div className={s.main}>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
