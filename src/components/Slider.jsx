/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { useSelector } from 'react-redux'

const Slider = () => {
  const { banner } = useSelector((state) => state.app)
  return (
    <div className="flex flex-col">
      {banner?.map((item) => (
        <img
          key={item.encodeId}
          src={item.banner}
          className="flex-1 object-contain"
        />
      ))}
    </div>
  )
}

export default Slider
