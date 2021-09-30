import React from 'react'
import axios from 'axios'
import BlogsPage from '../BlogList/BlogsPage'

const AllBlogs = () => {
  const fetchBlogs = () => {
    return axios.get(process.env.REACT_APP_READ_BLOGS_ENDPOINT)
  }

  return <BlogsPage fetcher={fetchBlogs} />
}

export default AllBlogs
