import React, { useEffect, useState } from 'react'
import Loader from 'react-loader-spinner'

import dateFormatter from '../../Global/dateFormatter'
import Blog from './Blog'

const BlogsSwitch = ({ blogs, loading, error }) => {
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

export default BlogsSwitch
