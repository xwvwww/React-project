import { React, useState } from 'react'

import Input from '../../components/Input'
import Button from '../../components/Button'

import s from './PostCreationPage.module.scss'

import { useDispatch, useSelector } from 'react-redux'

import { addPost } from '../../store/postsSlice'

import { useNavigate } from 'react-router-dom'

import { useSnackbar } from 'notistack'

function PostCreationPage() {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user.user)
  const userId = user ? user.id : null

  const [postImage, setPostImage] = useState('')
  const [postTitle, setPostTitle] = useState('')
  const [postText, setPostText] = useState('')

  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(addPost({ userId: userId, postImage, postTitle, postText }))
    enqueueSnackbar('Post created successfully!', { variant: 'success' })
    navigate(-1)
  }

  return (
    <div className={s.postCreationPage}>
      <div className={s.container}>
        <div className={s.title}>Post creation</div>
        <form className={s.form} onSubmit={onSubmit}>
          <div className={s.inputs}>
            <Input
              label="Image url"
              variant="settingsInput"
              value={postImage}
              onChange={(e) => setPostImage(e.target.value)}
            />
            <Input
              label="Title"
              variant="settingsInput"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
            />
            <label className={s.labelTextarea}>
              Text
              <textarea
                className={s.textarea}
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
              />
            </label>
          </div>
          <Button className={s.button} type="submit">
            Create
          </Button>
        </form>
      </div>
    </div>
  )
}

export default PostCreationPage
