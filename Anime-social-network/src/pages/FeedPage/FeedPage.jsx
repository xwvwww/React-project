import { React } from 'react'

import PostsGrid from '../../components/PostsGrid'

function FeedPage() {
  return <PostsGrid allUsersPosts={true} showFeedElements={true} />
}

export default FeedPage
