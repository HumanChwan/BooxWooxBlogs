import React, { useState, useEffect } from 'react'

import BlogsSwitch from './BlogsSwitch'

import './blogs.css'

const BLOGS_PER_PAGE = 10
function Pagination({ fetcher }) {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [blogsToShow, setBlogsToShow] = useState([])
  const [next, setNext] = useState(0)

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true)

      try {
        const response = await fetcher()

        const {
          data: {
            data: { Items },
          },
        } = response

        setBlogs(Items)
      } catch (e) {
        console.error(e)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
    // eslint-disable-next-line
  }, [])

  const loopWithSlice = (start, end) => {
    const slicedBlogs = blogs.slice(start, end)
    const newSetOfBlogs = [...blogsToShow, ...slicedBlogs]
    setBlogsToShow([...newSetOfBlogs])
  }

  useEffect(() => {
    if (blogs.length) {
      const newNext = Math.min(next + BLOGS_PER_PAGE, blogs.length)
      loopWithSlice(next, newNext)
      setNext(newNext)
    }
    // eslint-disable-next-line
  }, [blogs])

  const handleShowMoreBlogs = () => {
    const newNext = Math.min(next + BLOGS_PER_PAGE, blogs.length)
    loopWithSlice(next, newNext)
    setNext(newNext)
  }

  return (
    <div>
      <BlogsSwitch blogs={blogsToShow} loading={loading} error={error} />
      <div
        id={
          next === blogs.length || loading || error
            ? 'load-inactive'
            : 'load-up'
        }
        onClick={handleShowMoreBlogs}
      >
        <i id='load'>Load more</i>
      </div>
    </div>
  )
}

export default Pagination
