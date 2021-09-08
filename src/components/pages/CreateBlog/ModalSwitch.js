import React from 'react'
import ErrorSubmit from './ErrorSubmit'
import SubmitLoading from './SubmitLoading'
import SuccessModal from './SuccessModal'

const ModalSwitch = ({
    submitLoading,
    submitError,
    imageUploadLoading,
    imageUploadError,
    setShowModal,
    setSubmitError,
    setImageUploadError,
}) => {
    if (submitLoading || imageUploadLoading) {
        return <SubmitLoading />
    }

    if (submitError || imageUploadError) {
        return (
            <ErrorSubmit
                error={'Could not upload! Try again later'}
                setSubmitError={setSubmitError}
                setImageUploadError={setImageUploadError}
            />
        )
    }

    return <SuccessModal setShowModal={setShowModal} />
}

export default ModalSwitch
