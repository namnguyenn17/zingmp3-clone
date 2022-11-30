/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getArrSlider } from '../utils/helper'

const Slider = () => {
  const { banner } = useSelector((state) => state.app)

  useEffect(() => {
    const sliderList = document.getElementsByClassName('slider-item')
    let min = 0
    let max = 2
    const intervalId = setInterval(() => {
      const list = getArrSlider(min, max, sliderList.length - 1)
      for (let i = 0; i < sliderList.length; i++) {
        if (list.some((item) => item === i)) {
          sliderList[i].style.cssText = `display: block`
        } else {
          sliderList[i].style.cssText = `display: none`
        }
      }
      if (min === sliderList.length - 1) {
        min = 0
      } else {
        min += 1
      }
      if (max === sliderList.length - 1) {
        max = 0
      } else {
        max += 1
      }

      console.log(list)
    }, 1500)

    return () => {
      intervalId && clearInterval(intervalId)
    }
  }, [])

  return (
    <div className="flex gap-4 w-full overflow-hidden px-[59px] pt-8 ">
      {banner?.map((item) => (
        <img
          key={item.encodeId}
          src={item.banner}
          className="slider-item flex-1 object-contain w-1/3 rounded-lg"
        />
      ))}
    </div>
  )
}

export default Slider
