import React from 'react'

import s from './Input.module.scss'

function Input({
  placeholder = '',
  label = '',
  value,
  onChange,
  className = '',
  variant,
  type = 'text',
}) {
  const labelClassName = `${s.label} ${className} ${s[variant]}`
  const inputClassName = `${s.input} ${className} ${s[variant]}`

  return (
    <label className={labelClassName}>
      {label}
      <input
        type={type}
        className={inputClassName}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </label>
  )
}

export default Input
