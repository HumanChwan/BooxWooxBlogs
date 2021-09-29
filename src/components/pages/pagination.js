import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import './blogs.css'
import icon from '../images/bookmark.svg'
import authorPic from '../images/img-2.jpg'
import pic from '../images/img-1.jpg'
import dateFormatter from '../Global/dateFormatter'
import { useUser } from '../Contexts/UserContext'

const isLink = (img) => img.includes('https://') || img.includes('http://')
const getImg = (img) => {
  return isLink(img) ? img : pic
}
function Blog(blog) {
  const handleLikeUpdate = () => {}

  return (
    <div className='blog-box'>
      <div id='bmi'>
        <img
          src={icon}
          alt='bookmark-icon'
          className={
            blog.bookmarked ? 'bookmark-icon' : 'bookmark-icon-inactive'
          }
        />
      </div>
      <div className='heading'>
        <img src={authorPic} alt='author-pic' className='author-pic' />
        <div className='info'>
          <div id='username'>{blog.user}</div>
          <div id='date'>{blog.date}</div>
        </div>
        <i id='likes-icon' className='fa fa-heart' onClick={handleLikeUpdate} />
        <div id='likes'>{blog.likes}</div>
      </div>

      <div className='body'>
        <Link to={'/blog/' + blog.id}>
          <img src={getImg(blog.pic)} alt='blog-pic' className='image' />

          <div className='content'>
            <h1>{blog.heading}</h1>
            <p>{blog.content}</p>
          </div>
        </Link>

        <div className='footing'>
          <Link to='/' className='author'>
            <i className='fa fa-user'></i> {blog.author}
          </Link>
          <Link to='/' className='tags'>
            <i className='fa fa-tag fa-flip-horizontal'></i> {blog.tags}
          </Link>
          <p className='time'>
            <i className='fa fa-clock-o'></i> {blog.time}
          </p>
        </div>
      </div>
    </div>
  )
}

const Blogs = ({ blogs, loading, error }) => {
  const [blogHolding, setBlogHolding] = useState([])

  useEffect(() => {
    const heldBlogs = blogs.map((blog, idx) => (
      <Blog
        key={idx}
        id={blog.id}
        user='silverduck204'
        authorPic='{blogs[i].authorPic}'
        date={dateFormatter(blog.Date)}
        likes='24'
        pic={blog.Feature_Img}
        heading={blog.Title}
        content={blog.Description}
        author={blog.Author}
        tags='Horror,timepass'
        time='2 min'
        bookmarked={true}
      />
    ))
    setBlogHolding([...heldBlogs])
    // eslint-disable-next-line
  }, [blogs])

  if (loading) {
    return (
      <div id='load-ani'>
        <Loader type='Rings' color='#FFBD06' height={100} width={100} />
      </div>
    )
  }
  if (error) {
    return (
      <div id='load-ani'>
        Oops! There seems to be an error.
        <br />
        Please try again.
      </div>
    )
  }

  return <div>{blogHolding}</div>
}

const BLOGS_PER_PAGE = 10
function Pagination() {
  const { HEADERS } = useUser()

  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [blogsToShow, setBlogsToShow] = useState([])
  const [next, setNext] = useState(0)

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true)

      try {
        const response = await axios.get(
          process.env.REACT_APP_READ_BLOGS_ENDPOINT,
          { ...HEADERS }
        )

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
      <Blogs blogs={blogsToShow} loading={loading} error={error} />
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
