import React from 'react'
import ErrorSubmit from './ErrorSubmit'
import SubmitLoading from './SubmitLoading'
import SuccessModal from './SuccessModal'

const ModalSwitch = ({ submitLoading, submitError }) => {
  if (submitLoading) {
    return <SubmitLoading />
  }

  if (submitError) {
    return <ErrorSubmit />
  }

  return <SuccessModal />
}

export default ModalSwitch
