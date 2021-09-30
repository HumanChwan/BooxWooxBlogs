import React from 'react'
import axios from 'axios'
import { useUser } from '../../Contexts/UserContext'
import BlogsPage from '../BlogList/BlogsPage'

const AllBlogs = () => {
  const { HEADERS } = useUser()

  const fetchBlogs = () => {
    return axios.get(process.env.REACT_APP_READ_BLOGS_ENDPOINT, { ...HEADERS })
  }

  return <BlogsPage fetcher={fetchBlogs} />
}

export default AllBlogs
