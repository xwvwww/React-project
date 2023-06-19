import React from 'react'

import s from './Button.module.scss'

function Button({
  children,
  isLoading,
  className,
  variant,
  type = 'button',
  onClick,
  ...props
}) {
  const inputClassName = `${className} ${s[variant]} ${s.button}`

  return (
    <button
      {...props}
      onClick={onClick}
      type={type}
      className={inputClassName}
      disabled={isLoading}
    >
      {children}
    </button>
  )
}

export default Button
