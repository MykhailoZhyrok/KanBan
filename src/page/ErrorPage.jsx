import React from 'react'
import img from '../img/loading-screen-cat.gif'

export const ErrorPage = () => {
  return (
    <div className="position-fixed top-0 bottom-0 left-0 right-0">
      <img src={img} className="h-100" alt="erroCattt" />
    </div>
  )
}
