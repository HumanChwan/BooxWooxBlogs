import React, { useState, useRef, useEffect } from 'react'
import { ReactComponent as ArrowLeft } from '../../../assets/arrow-left.svg'
import { ReactComponent as UploadSym } from '../../../assets/upload-symbol.svg'
import { ReactComponent as CloseIcon } from '../../../assets/close-icon.svg'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import './newBlog.css'
import { Link } from 'react-router-dom'
import { useUser } from '../../Contexts/UserContext'
import Modal from '../../Global/Modal'
import ModalSwitch from './ModalSwitch'
import useEventListener from '../../../hooks/useEventListener'

export default function NewBlog() {
  const { uploadBlog, getImgurLink } = useUser()

  const [files, setFiles] = useState(undefined)
  const [fileDescription, setFileDescription] = useState('')
  const [previewURL, setPreviewURL] = useState('')

  const [submitError, setSubmitError] = useState('')
  const [submitLoading, setSubmitLoading] = useState(false)

  const [errorFeatureImg, setErrorFeatureImg] = useState('')
  const [imageUploadLoading, setImageUploadLoading] = useState(false)
  const [imageUploadError, setImageUploadError] = useState(false)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [rawContent, setRawContent] = useState('')

  const [showModal, setShowModal] = useState(false)

  const textAreaRef = useRef()

  const handleSubmitBlog = async (e) => {
    e.preventDefault()
    setSubmitLoading(true)
    setShowModal(true)
    const result = await uploadBlog({
      Title: title,
      Description: description,
      Content: rawContent,
      Feature_Img: previewURL,
      Status: 'Published',
    })
    setSubmitLoading(false)

    if (result) {
      setShowModal(true)
    } else {
      setSubmitError('Submit Failed, Try Again Later!')
    }
  }

  const handleSaveDraftOfBlog = async (e) => {
    e.preventDefault()
    console.log(files[0])
    const result = await uploadBlog({
      Title: title,
      Description: description,
      Content: rawContent,
      Feature_Img: previewURL,
      Status: 'Draft',
    })

    if (result) {
      // show modal
      setShowModal(true)
    } else {
      setSubmitError('Failed to save draft, try again later!')
    }
  }

  function validFormat(format) {
    return format.substr(0, 6) === 'image/'
  }

  function emptyFileList() {
    setFiles(null)
    setFileDescription('')
  }

  const getLinkOfImage = async (file) => {
    setImageUploadLoading(true)
    setShowModal(true)
    let newLink
    try {
      newLink = await getImgurLink(file)
    } catch (e) {
      newLink = { success: false }
    } finally {
      setShowModal(false)
      setImageUploadLoading(false)
    }

    return newLink
  }

  const handleLocalUpload = async (fileList) => {
    if (fileList.length <= 0) {
      return
    }
    if (!validFormat(fileList[0].type)) {
      setErrorFeatureImg('Wrong Type File!')
      emptyFileList()
      return
    }
    setFileDescription(fileList[0].name)

    const newLink = await getLinkOfImage(fileList[0])
    if (newLink.success) {
      setPreviewURL(newLink.link)
      setFiles([...fileList])
    } else {
      setErrorFeatureImg('Could not upload! Try again later.')
    }
  }

  function dragOver(e) {
    e.preventDefault()
  }
  function dragEnter(e) {
    e.preventDefault()
  }
  function dragLeave(e) {
    e.preventDefault()
  }
  function fileDrop(e) {
    e.preventDefault()
    const fileList = e.dataTransfer.files
    handleLocalUpload(fileList)
  }

  async function textAreaFileDrop(e) {
    e.preventDefault()
    const fileList = e.dataTransfer.files
    if (fileList.length <= 0 || !validFormat(fileList[0].type)) {
      return
    }

    const newLink = await getLinkOfImage(fileList[0])

    if (newLink.success) {
      setRawContent(
        rawContent + '\n' + `![${fileList[0].name}](${newLink.link})\n\n`
      )
    } else {
      setShowModal(true)
      setImageUploadError(true)
    }
  }

  function handleNewUpload(e) {
    e.preventDefault()
    const fileList = e.target.files
    handleLocalUpload(fileList)
  }

  useEffect(() => {
    textAreaRef.current.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault()
        setRawContent(rawContent => rawContent + '\t')
      }
    })
  }, [])

  return (
    <>
      <div className='create-new-blog-container'>
        <div className='create-new-blog'>
          <form>
            <div className='create-new-blog__upper'>
              <span className='create-new-blog__upper__left'>
                <Link to='/'>
                  <ArrowLeft className='create-new-blog__upper__left-svg' />
                </Link>
                <span className='create-new-blog__upper__left-text'>
                  Create Blog
                </span>
              </span>
              <div className='create-new-blog__upper__right__wrapper'>
                <input
                  type='submit'
                  className='blog-btns create-new-blog__upper__right__btn_1'
                  value='Save As Draft'
                  onClick={handleSaveDraftOfBlog}
                />
                <input
                  type='submit'
                  className='blog-btns btn create-new-blog__upper__right__btn_2'
                  value='Submit'
                  onClick={handleSubmitBlog}
                />
              </div>
            </div>
            <div className='create-new-blog__form'>
              <input
                type='text'
                placeholder='Add blog title'
                className='create-new-blog__form__input-text create-new-blog__form__title'
                autoComplete='off'
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                }}
              />
              <input
                type='text'
                placeholder='Add blog description'
                className='create-new-blog__form__input-text create-new-blog__form__description'
                autoComplete='off'
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
              />
              <div
                className='create-new-blog__form__input-upload__wrapper'
                onDragEnter={dragEnter}
                onDragOver={dragOver}
                onDragLeave={dragLeave}
                onDrop={fileDrop}
              >
                {(!files || !files.length) && (
                  <p className='create-new-blog__form__input-upload__caption'>
                    Add Featuring Image
                  </p>
                )}
                <div className='create-new-blog__form__input-upload__input_dialog'>
                  <div>
                    {files && files.length && (
                      <div className='preview-image-wrapper'>
                        <p>Preview</p>
                        <div
                          style={{
                            backgroundImage: `url(${previewURL})`,
                          }}
                          className='preview-image'
                        ></div>
                      </div>
                    )}
                    <UploadSym />
                    <p className='dialog__caption'>Drag and drop image here</p>
                    <label className='btn create-new-blog__form__input-upload__input'>
                      <input
                        type='file'
                        id='fileInput'
                        name='fileInput'
                        files={files}
                        onChange={handleNewUpload}
                      />
                      Choose a file
                    </label>
                    {files && (
                      <div className='prompt create-new-blog__input-value'>
                        <p>{fileDescription}</p>
                        <CloseIcon onClick={emptyFileList} />
                      </div>
                    )}
                    {errorFeatureImg !== '' && (
                      <p className='prompt upload-error'>{errorFeatureImg}</p>
                    )}
                  </div>
                </div>
              </div>
              <p className='create-new-blog__blog-content__caption'>
                Our Editor supports Markdown! Learn more about it{' '}
                <a
                  href='https://www.markdownguide.org/'
                  target='_blank'
                  rel='noreferrer'
                  className='basic-link'
                >
                  here
                </a>
                .
              </p>
              <div className='create-new-blog__blog-content__wrapper'>
                <textarea
                  name='blog-content'
                  placeholder='Add Blog Content'
                  className='create-new-blog__form__input-text create-new-blog__form__textarea'
                  value={rawContent}
                  onChange={(e) => {
                    setRawContent(e.target.value)
                  }}
                  onDragEnter={dragEnter}
                  onDragOver={dragOver}
                  onDragLeave={dragLeave}
                  onDrop={textAreaFileDrop}
                  ref={textAreaRef}
                ></textarea>
                <div className='create-new-blog__blog-content__markdown'>
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                    {rawContent}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        allowRemove={!!submitError || !!imageUploadError}
      >
        <ModalSwitch
          submitLoading={submitLoading}
          submitError={submitError}
          imageUploadError={imageUploadError}
          imageUploadLoading={imageUploadLoading}
          setShowModal={setShowModal}
          setSubmitError={setSubmitError}
          setImageUploadError={setImageUploadError}
        />
      </Modal>
    </>
  )
}
