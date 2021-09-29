import { useState, useEffect } from 'react'
import axios from 'axios'
import rehypeRaw from 'rehype-raw'
import ReactMarkdown from 'react-markdown'
import heart from '../../assets/heart.svg'
import share from '../../assets/share.svg'
import eye from '../../assets/eye.svg'
import chevronDown from '../../assets/chevron-down.svg'
import authorPic from '../images/img-2.jpg'
import pic from '../images/img-1.jpg'
import dateFormatter from '../Global/dateFormatter'
import './blog.css'
import { useUser } from '../Contexts/UserContext'
import Loader from 'react-loader-spinner'

const replies = [
  {
    user: 'santaslabs',
    content:
      'Lol! Says the one who was literally on four legs last night at the bar XD',
  },
  { user: 'notanimposter', content: 'This is cringe worthy' },
  {
    user: 'goldenduck04',
    content:
      "It's very sad how people misinterpret things for their own benefit",
  },
]

var blogID = ''

function Replies() {
  if (replies.length === 0)
    return (
      <div id='replies-list'>
        <div>No replies to show</div>
      </div>
    )

  var replyHolder = []
  replies.map((reply) =>
    replyHolder.push(
      <div id='reply-box'>
        <div id='reply-username'>{reply.user}</div>
        <div id='reply'>{reply.content}</div>
      </div>
    )
  )

  return <div id='replies-list'>{replyHolder}</div>
}

const isLink = (img) => img.includes('https://') || img.includes('http://')
const getImg = (img) => {
  console.log('img:', img)
  return isLink(img) ? img : pic
}

function Blog() {
  const { HEADERS } = useUser()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [date, setDate] = useState('')
  const [featuredImage, setFeaturedImage] = useState('')

  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    blogID = window.location.href.split('/').slice(-1)[0]
  }, [])

  const updateItem = (Item) => {
    setTitle(Item.Title.S)
    setContent(Item.Content.S)
    setDate(Item.Date.S)
    setFeaturedImage(Item.Feature_Img.S)
    setAuthor(Item.Author?.S)
  }

  useEffect(() => {
    const axe = async () => {
      const opt = {
        method: 'POST',
        url: process.env.REACT_APP_READ_SINGLE_BLOG_ENDPOINT,
        data: { id: blogID },
        ...HEADERS,
      }

      try {
        const response = await axios(opt)

        const {
          data: {
            message: { Item },
          },
        } = response

        console.log(Item)
        updateItem(Item)
      } catch (e) {
        console.error(e)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    axe()
    // eslint-disable-next-line
  }, [])

  const [showReplies, setShowReplies] = useState(false)

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

  return (
    <div id='page'>
      <div id='author-info'>
        <img id='profilepic' src={authorPic} alt='author' />
        <div id='info'>
          <div id='username-blog'>silverduck04</div>
          <div id='badge-info'>Silver Badge Owner</div>
        </div>
      </div>
      <div id='body'>
        <div id='sidebar'>
          <div id='author'>
            Author
            <hr /*style={width:"fit-content"}*/ />
          </div>
          <div>
            <div id='author-username'>{author}</div>
            <div id='author-bio'>
              I am a jobless, hopeless, senseless individual who's still
              struggling to figure out why he's alive :)
            </div>
            <hr />
          </div>
          <div id='icons'>
            <img id='like' src={heart} alt='heart' />
            <img id='share' src={share} alt='share' />
          </div>
        </div>
        <div id='content'>
          <div id='head'>
            <div id='title'>{title}</div>
            <div id='head-info'>
              <div id='time-date'>15:03 {dateFormatter(date)}</div>
              <div id='views'>
                {' '}
                <img id='eye' src={eye} alt='eye' /> 204
              </div>
            </div>
          </div>
          <div id='image'>
            <img
              id='featured-image'
              src={getImg(featuredImage)}
              alt='featured-img'
            />
            <div>Image Courtesy: Leon Tusk</div>
          </div>

          <div id='blog-body'>
            <div className='blog-content__markdown'>
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                {content}
                {/* **What is Lorem Ipsum?**

                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        *Why do we use it?*

                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

                        **Where does it come from?**

                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

                        The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                        *Where can I get some?*

                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. */}
              </ReactMarkdown>
            </div>
          </div>
          <div id='comments-box'>
            <div id='comments'>
              Comments <hr />{' '}
            </div>
            <textarea
              id='comment-input'
              placeholder='Write your comments'
            ></textarea>
            <div id='post-btn'>
              <div id='post'>Post</div>
            </div>
            <div id='replies'>
              <img id='userpic' src={authorPic} alt='author' />
              <div>
                <div id='profile-name'>silverduck04</div>
                <div id='comment'>
                  Alcohol based exposures through inadvertently consuming hand
                  sanitizers have been observed to produce more negative side
                  effects for children than non-alcohol based.
                </div>
                <div
                  id='reply-dropdown'
                  onClick={() => {
                    setShowReplies(!showReplies)
                  }}
                >
                  Replies{' '}
                  <img
                    id={showReplies ? 'chevron-up' : 'chevron-down'}
                    alt='chevron'
                    src={chevronDown}
                  />
                </div>
                <div id='reply-btn'>Click here to reply</div>
                {showReplies ? <Replies /> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog
