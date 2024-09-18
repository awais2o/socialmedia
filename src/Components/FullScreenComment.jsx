import React, { useState, useEffect, useRef } from 'react'
import { ArrowBigRight } from 'lucide-react'
import { useSelector } from 'react-redux'
import { firestore } from '../config/firebase' // Ensure db is imported correctly
import {
  collection,
  doc,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  addDoc
} from 'firebase/firestore'

const FullScreenComment = ({ onClose, postId }) => {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [lastVisible, setLastVisible] = useState(null)
  const [loading, setLoading] = useState(false)
  const [noMoreComments, setNoMoreComments] = useState(false)

  const user = useSelector(state => state.users.value)
  const commentsEndRef = useRef(null)

  useEffect(() => {
    fetchInitialComments()
  }, [postId])

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        if (!loading && !noMoreComments) {
          fetchMoreComments()
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [loading, noMoreComments])

  const fetchInitialComments = async () => {
    try {
      const commentsRef = collection(
        doc(firestore, 'posts', postId),
        'comments'
      )
      const q = query(commentsRef, orderBy('createdAt', 'desc'), limit(30))

      const snapshot = await getDocs(q)
      if (snapshot.empty) {
        setNoMoreComments(true)
        return
      }

      const newComments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      setComments(newComments)
      setLastVisible(snapshot.docs[snapshot.docs.length - 1])
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }

  const fetchMoreComments = async () => {
    if (lastVisible) {
      setLoading(true)
      try {
        const commentsRef = collection(
          doc(firestore, 'posts', postId),
          'comments'
        )
        const q = query(
          commentsRef,
          orderBy('createdAt', 'desc'),
          startAfter(lastVisible),
          limit(30)
        )

        const snapshot = await getDocs(q)
        if (snapshot.empty) {
          setNoMoreComments(true)
        } else {
          const newComments = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))

          setComments(prevComments => [...prevComments, ...newComments])
          setLastVisible(snapshot.docs[snapshot.docs.length - 1])
        }
      } catch (error) {
        console.error('Error fetching more comments:', error)
      }
      setLoading(false)
    }
  }

  const handleCommentChange = event => {
    setNewComment(event.target.value)
  }

  const handleAddComment = async () => {
    if (newComment.trim() === '') return

    try {
      const newCommentData = {
        uid: user.uid,
        comment: newComment,
        username: user.displayName,
        createdAt: new Date(),
        profilePictureURL: user.photoURL
      }
      setNewComment('')

      await addDoc(
        collection(doc(firestore, 'posts', postId), 'comments'),
        newCommentData
      )

      //   setComments([newCommentData, ...comments]) // Update the UI immediately
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }

  return (
    <div className='fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-75'>
      <div className='bg-white dark:bg-slate-700 rounded-lg max-w-3xl w-full p-6 overflow-auto'>
        {/* Comments List */}
        <h2 className='text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4'>
          Comments
        </h2>
        {comments.length > 0 ? (
          <ul className='space-y-4'>
            {comments.map(comment => (
              <li
                key={comment.id}
                className='bg-gray-100 dark:bg-slate-600 p-4 rounded-md flex'
              >
                <img
                  src={comment.profilePictureURL}
                  alt={`${comment.username}'s profile`}
                  className='w-10 h-10 rounded-full mr-3'
                />
                <div>
                  <p className='text-sm text-gray-700 dark:text-gray-100'>
                    <strong>{comment.username}:</strong> {comment.comment}
                  </p>
                  <p className='text-xs text-gray-500 dark:text-gray-400'>
                    {new Date(comment.createdAt?.toDate()).toLocaleString()}
                  </p>
                </div>
              </li>
            ))}
            {loading && <p>Loading more comments...</p>}
            {noMoreComments && <p>No more comments</p>}
          </ul>
        ) : (
          <p className='text-gray-600 dark:text-gray-400'>No comments yet.</p>
        )}

        {/* New Comment Input */}
        <div className='flex mt-6'>
          <input
            type='text'
            value={newComment}
            onChange={handleCommentChange}
            placeholder='Add a comment...'
            className='flex-1 border border-gray-300 dark:border-slate-600 rounded-lg p-2'
          />
          <button
            onClick={handleAddComment}
            className='ml-2 bg-blue-500 text-white rounded-lg p-2 flex items-center'
          >
            <ArrowBigRight className='w-5 h-5' />
          </button>
        </div>
      </div>
      {/* Close Button */}
      <button
        className='absolute top-4 right-4 text-white text-2xl font-bold'
        onClick={onClose}
      >
        &times; {/* Close icon */}
      </button>
    </div>
  )
}

export default FullScreenComment
