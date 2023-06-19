import { React, useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import s from './PostsGrid.module.scss'

import PostCard from '../PostCard'
import Button from '../../components/Button'

import { Link } from 'react-router-dom'

import { getPosts } from '../../store/postsSlice'

function PostsGrid({ allUsersPosts, userId, showFeedElements }) {
  const { posts } = useSelector((state) => state.posts)
  const { user } = useSelector((state) => state.user)

  const [page, setPage] = useState(1)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      getPosts({
        userId: allUsersPosts ? undefined : userId,
        limit: 9,
        page: page,
        isExpanded: true,
      })
    )
  }, [])

  const onPrev = () => {
    if (page === 1) return
    setPage((prev) => prev - 1)

    dispatch(
      getPosts({
        userId: allUsersPosts ? undefined : userId,
        limit: 9,
        page: page - 1,
        isExpanded: true,
      })
    )
  }

  const onNext = () => {
    if (posts.length < page * 9) return
    setPage((prev) => prev + 1)

    dispatch(
      getPosts({
        userId: allUsersPosts ? undefined : userId,
        limit: 9,
        page: page + 1,
        isExpanded: true,
      })
    )
  }

  return (
    <div className={s.postsGrid}>
      <div className={s.posts}>
        {showFeedElements && (
          <>
            <div className={s.title}>Recent posts</div>
            <Link to="/create-post" className={s.link}>
              Add new post
            </Link>
          </>
        )}
        <div className={s.grid}>
          {posts.map((elem) => (
            <PostCard
              img={elem.postImage}
              title={elem.postTitle}
              text={elem.postText}
              id={elem.id}
              key={elem.id}
              userName={user.id === elem.userId ? user.name : 'ANON'}
            />
          ))}
        </div>
      </div>
      <div className={s.buttons}>
        <Button className={s.button} onClick={onPrev}>
          Prev
        </Button>
        <Button className={s.button} onClick={onNext}>
          Next
        </Button>
      </div>
    </div>
  )
}

export default PostsGrid
