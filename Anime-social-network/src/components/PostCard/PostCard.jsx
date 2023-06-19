import { React } from 'react'

import { Link } from 'react-router-dom'

import s from './PostCard.module.scss'

function PostCard({ userName, img, title, id }) {
  return (
    <Link to={`/feed/${id}`} className={s.link}>
      <div className={s.imageWrapper}>
        <img className="fill" src={img} alt="" />
        <div className={s.overlayText}>
          <div className={s.name}>{userName}</div>
          <div className={s.title}>{title}</div>
        </div>
      </div>
    </Link>
  )
}

export default PostCard
