import React, { useEffect } from 'react'

const ErrorSubmit = ({ error, setSubmitError, setImageUploadError }) => {
    useEffect(() => {
        return () => {
            setSubmitError(false)
            setImageUploadError(false)
        }
        // eslint-disable-next-line
    }, [])

    return <div className='modal-body submit-error'>{error}</div>
}

export default ErrorSubmit
