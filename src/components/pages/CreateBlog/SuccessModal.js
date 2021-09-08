import React from 'react'
import { ReactComponent as CheckCircle } from '../../../assets/check-circle.svg'
import { useHistory } from 'react-router'
import useTimeout from '../../../hooks/useTimeout'

const SuccessModal = ({ setShowModal }) => {
    const history = useHistory()

    useTimeout(() => {
        setShowModal(false)
        history.push('/')
    }, 10000)

    return (
        <div className='modal-body submit-success'>
            <CheckCircle />
            <h3>Thanks for writing a blog.</h3>
            <p>
                Your blog will be screened from our committee and will notify
                you for publishing the blog.
            </p>
            <button
                onClick={() => {
                    history.push('/')
                }}
                className='btn'
            >
                Go to Home
            </button>
            <h6>You will be redirected to home page in 10sec</h6>
        </div>
    )
}

export default SuccessModal
