import React from 'react'
import axios from 'axios'
import { useUser } from '../../Contexts/UserContext'
import BlogsPage from '../BlogList/BlogsPage'

const MyBlogs = () => {
  const { HEADERS } = useUser()

  const fetchBlogs = () => {
    return axios({
      method: 'POST',
      url: process.env.REACT_APP_MY_BLOGS_ENDPOINT,
      ...HEADERS,
    })
  }

  return <BlogsPage fetcher={fetchBlogs} />
}

export default MyBlogs
