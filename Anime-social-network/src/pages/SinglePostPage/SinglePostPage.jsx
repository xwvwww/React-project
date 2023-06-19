import React from 'react'

import { useSnackbar } from 'notistack'

import { useParams, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import Button from '../../components/Button'

import { deletePost, editPost } from '../../store/postsSlice'

import s from './SinglePostPage.module.scss'

function SinglePostPage() {
  const { id } = useParams()

  const currentUser = useSelector((state) => state.user.user)

  const dispatch = useDispatch()

  const { enqueueSnackbar } = useSnackbar()

  const navigate = useNavigate()

  const { posts } = useSelector((state) => state.posts)
  const { user } = useSelector((state) => state.user)

  const post = posts.find((p) => p.id === Number(id))

  const handleDeleteClick = () => {
    dispatch(deletePost(post.id))

    navigate(-1)
    enqueueSnackbar('Post deleted', { variant: 'error' })
  }

  const handleEditClick = () => {
    dispatch(
      editPost({
        id: post.id,
        userId: post.userId,
        postTitle: post.postTitle,
        postText: updatedText,
        postImage: post.postImage,
      })
    )
    setIsEditMode(false)
    enqueueSnackbar('Post edited', { variant: 'success' })
  }

  const [isEditMode, setIsEditMode] = React.useState(false)
  const [updatedText, setUpdatedText] = React.useState(post.postText)

  const handleCancelClick = () => {
    setUpdatedText(post.postText)
    setIsEditMode(false)
  }

  const isAuthorizedUser = currentUser && currentUser.id === post.userId

  return (
    <div className={s.singlePostPage}>
      <div className={s.container}>
        <div className={s.title}>{post.postTitle}</div>
        <div className={s.postInfo}>
          <div className={s.imageWrapper}>
            <img className="fill" src={post.postImage} alt={post.postTitle} />
          </div>
          {isEditMode ? (
            <textarea
              className={s.postDescription}
              value={updatedText}
              onChange={(e) => setUpdatedText(e.target.value)}
            />
          ) : (
            <div className={s.postDescription}>{post.postText}</div>
          )}
        </div>
        <div className={s.author}>
          {user.avatar && (
            <div className={s.imageWrapper}>
              <img className="fill" src={user.avatar} alt="" />
            </div>
          )}
          <div className={s.name}>{user.name ? user.name : user.email}</div>
        </div>
        {isAuthorizedUser && (
          <div className={s.buttons}>
            {!isEditMode && (
              <>
                <Button
                  className={s.button}
                  variant="red"
                  onClick={handleDeleteClick}
                >
                  Delete
                </Button>
                <Button className={s.button} onClick={() => setIsEditMode(true)}>
                  Edit
                </Button>
              </>
            )}
            {isEditMode && (
              <>
                <Button
                  className={s.button}
                  variant="red"
                  onClick={handleCancelClick}
                >
                  Cancel
                </Button>
                <Button className={s.button} onClick={handleEditClick}>
                  Save
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}


export default SinglePostPage
