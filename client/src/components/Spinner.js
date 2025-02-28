import React from 'react'
import '@ant-design/v5-patch-for-react-19';

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center spinner">
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>
  )
}

export default Spinner