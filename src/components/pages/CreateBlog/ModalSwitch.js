import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import ErrorSubmit from './ErrorSubmit'
import SubmitLoading from './SubmitLoading'
import SuccessModal from './SuccessModal'

const ModalSwitch = ({
    submitLoading,
    submitError,
    imageUploadLoading,
    imageUploadError,
    submitted,
    setShowModal,
}) => {
    const history = useHistory()
    useEffect(() => {
        if (submitted) {
            const id = setTimeout(() => {
                history.push('/')
                setShowModal(false)
            }, 10000)

            return () => {
                clearTimeout(id)
            }
        }
    }, [submitted])

    if (submitLoading || imageUploadLoading) {
        return <SubmitLoading />
    }

    if (submitError || imageUploadError) {
        return <ErrorSubmit />
    }

    return <SuccessModal />
}

export default ModalSwitch
