import React from 'react'
import axios from 'axios'
import { useUser } from '../../Contexts/UserContext'
import BlogsPage from '../BlogList/BlogsPage'

const MyBlogs = () => {
  const { HEADERS } = useUser()

  const fetchBlogs = () => {
    return axios({
      method: 'POST',
      data: {
        id: 'e023f07310ac4ab0a4ec2357313d0e49',
      },
      url: process.env.REACT_APP_MY_BLOGS_ENDPOINT,
      ...HEADERS,
    })
  }

  return <BlogsPage fetcher={fetchBlogs} />
}

export default MyBlogs
