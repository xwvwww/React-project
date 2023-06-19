import React from 'react'

import s from './Button.module.scss'

import { Link } from 'react-router-dom'

function Button({ children, className, variant }) {
  const inputClassName = `${className} ${s[variant]} ${s.button}`

  return <Link className={inputClassName}>{children}</Link>
}

export default Button
