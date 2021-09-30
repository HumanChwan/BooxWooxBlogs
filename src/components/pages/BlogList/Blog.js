import React from 'react'
import { Link } from 'react-router-dom'

import icon from '../../images/bookmark.svg'
import authorPic from '../../images/img-2.jpg'
import pic from '../../images/img-1.jpg'

const isLink = (img) => img.includes('https://') || img.includes('http://')
const getImg = (img) => {
  return isLink(img) ? img : pic
}
const Blog = (blog) => {
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

export default Blog
