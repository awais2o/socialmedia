import React, { useState, useEffect } from 'react'
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
  getDocs
} from 'firebase/firestore'
import { firestore } from '../config/firebase' // Your Firestore config
import { Loader } from 'lucide-react'
import SinglePost from './SinglePost'

const PostsComponent = () => {
  const [posts, setPosts] = useState([])
  const [lastVisible, setLastVisible] = useState(null)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [newPosts, setNewPosts] = useState([])

  // Fetch initial posts
  const fetchInitialPosts = async () => {
    setLoading(true)

    const postsCollection = collection(firestore, 'posts')
    const postsQuery = query(
      postsCollection,
      orderBy('createdAt', 'desc'),
      limit(10)
    )

    const querySnapshot = await getDocs(postsQuery)
    const postsData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    setPosts(postsData)
    setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]) // Save last visible document
    setLoading(false)
  }

  // Fetch next 10 posts when scrolling to the bottom
  const fetchMorePosts = async () => {
    if (!hasMore || loading) return // If no more posts or already loading, do nothing

    setLoading(true)
    const postsCollection = collection(firestore, 'posts')
    const postsQuery = query(
      postsCollection,
      orderBy('createdAt', 'desc'),
      startAfter(lastVisible),
      limit(10)
    )

    const querySnapshot = await getDocs(postsQuery)
    const newPosts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    setPosts(prevPosts => [...prevPosts, ...newPosts])
    setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]) // Save new last visible document

    if (querySnapshot.docs.length < 10) {
      setHasMore(false) // No more posts to load
    }

    setLoading(false)
  }

  // Real-time listener for new posts
  const listenForNewPosts = () => {
    const postsCollection = collection(firestore, 'posts')
    const postsQuery = query(
      postsCollection,
      orderBy('createdAt', 'desc'),
      limit(1)
    )

    const unsubscribe = onSnapshot(postsQuery, snapshot => {
      if (!snapshot.empty) {
        const newPost = snapshot.docs[0].data()
        setNewPosts(prevNewPosts => [newPost, ...prevNewPosts])
      }
    })

    return unsubscribe
  }

  useEffect(() => {
    fetchInitialPosts()
    const unsubscribe = listenForNewPosts()
    return () => unsubscribe() // Cleanup real-time listener on component unmount
  }, [])

  // Function to load more posts when user scrolls to the bottom
  const handleScroll = e => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
      fetchMorePosts()
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastVisible, hasMore])

  return (
    <div className='md:w-2/3'>
      {newPosts.map((post, index) => (
        <SinglePost key={post.postId} post={post} />
      ))}

      {/* Display fetched posts */}
      {posts.map(post => (
        <SinglePost key={post.postId} post={post} />
      ))}

      {loading && (
        <div
          key='loading-skeleton'
          className='max-w-lg mx-auto my-5 p-6 bg-white dark:bg-slate-600 rounded-lg shadow-md animate-pulse'
        >
          <div className='flex items-center space-x-4'>
            {/* Placeholder for Profile Picture */}
            <div className='w-12 h-12 bg-gray-300 rounded-full dark:bg-gray-500'></div>
            <div>
              <div className='h-4 bg-gray-300 rounded w-24 dark:bg-gray-500'></div>
              <div className='h-3 bg-gray-300 rounded w-32 mt-2 dark:bg-gray-500'></div>
            </div>
          </div>

          <div className='mt-4'>
            <div className='h-3 bg-gray-300 rounded w-full dark:bg-gray-500'></div>
            <div className='h-3 bg-gray-300 rounded w-4/5 mt-2 dark:bg-gray-500'></div>
            <div className='h-3 bg-gray-300 rounded w-3/5 mt-2 dark:bg-gray-500'></div>
          </div>

          {/* Placeholder for Post Image */}
          <div className='mt-4'>
            <div className='h-48 bg-gray-300 rounded-lg dark:bg-gray-500'></div>
          </div>

          <div className='mt-4 flex justify-between items-center'>
            <div className='flex space-x-4'>
              <div className='h-3 bg-gray-300 rounded w-12 dark:bg-gray-500'></div>
              <div className='h-3 bg-gray-300 rounded w-16 dark:bg-gray-500'></div>
            </div>
            <div className='h-3 bg-gray-300 rounded w-24 dark:bg-gray-500'></div>
          </div>
        </div>
      )}
      {!hasMore && <p>No more posts to load</p>}
    </div>
  )
}

export default PostsComponent
