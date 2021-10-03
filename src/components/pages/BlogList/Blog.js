import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import icon from '../../images/bookmark.svg'
import authorPic from '../../images/img-2.jpg'
import pic from '../../images/img-1.jpg'
import axios from 'axios'
import { useUser } from '../../Contexts/UserContext'

const isLink = (img) => img.includes('https://') || img.includes('http://')
const getImg = (img) => {
  return isLink(img) ? img : pic
}

const Blog = (blogProp) => {
  const { HEADERS } = useUser()

  const [blog, setBlog] = useState(blogProp)

  const handleLikeUpdate = async () => {
    const axiosOptions = {
      method: 'PUT',
      url: process.env.REACT_APP_LIKE_BLOG_ENDPOINT,
      data: {
        id: blog.id,
        Likes: parseInt(blog.likes),
      },
      ...HEADERS,
    }

    try {
      const response = await axios(axiosOptions)
      const {
        data: {
          Item: {
            Item: {
              Likes: { N },
            },
          },
        },
      } = response

      setBlog({ ...blog, likes: N })
    } catch (e) {
      console.error(e)
    }
  }
  const handleDislikeUpdate = async () => {
    const axiosOptions = {
      method: 'PUT',
      url: process.env.REACT_APP_DISLIKE_BLOG_ENDPOINT,
      data: {
        id: blog.id,
        Dislikes: parseInt(blog.dislikes),
      },
      ...HEADERS,
    }

    try {
      const response = await axios(axiosOptions)
      const {
        data: {
          Item: {
            Item: {
              Dislikes: { N },
            },
          },
        },
      } = response

      setBlog({ ...blog, dislikes: N })
    } catch (e) {
      console.error(e)
    }
  }

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
        <div className='blog__people-data'>
          <i
            id='likes-icon'
            className='fa fa-heart'
            onClick={handleLikeUpdate}
          />
          <div id='likes'>{blog.likes || 0}</div>
        </div>
        <div className='blog__people-data'>
          <i
            id='dislikes-icon'
            className='fa fa-thumbs-down'
            onClick={handleDislikeUpdate}
          />
          <div id='likes'>{blog.dislikes || 0}</div>
        </div>
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

export default Blog
