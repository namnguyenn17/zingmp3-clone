/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getArrSlider } from '../utils/helper'
import * as actions from '../store/actions'
import { useNavigate } from 'react-router-dom'

const Slider = () => {
  const { banner } = useSelector((state) => state.app)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // animation for banner
  useEffect(() => {
    const sliderList = document.getElementsByClassName('slider-item')
    let min = 0
    let max = 2
    const intervalId = setInterval(() => {
      const list = getArrSlider(min, max, sliderList.length - 1)

      for (let i = 0; i < sliderList.length; i++) {
        // reset the classname
        sliderList[i]?.classList.remove(
          'animate-slide-right',
          'order-last',
          'z-index-20'
        )
        sliderList[i]?.classList.remove(
          'animate-slide-left',
          'order-first',
          'z-index-10'
        )
        sliderList[i]?.classList.remove(
          'animate-slide-left2',
          'order-2',
          'z-index-10'
        )

        if (list.some((item) => item === i)) {
          sliderList[i].style.cssText = `display: block`
        } else {
          sliderList[i].style.cssText = `display: none`
        }
      }

      list.forEach((item) => {
        if (item === max) {
          sliderList[item]?.classList.add(
            'animate-slide-right',
            'order-last',
            'z-index-20'
          )
        } else if (item === min) {
          sliderList[item]?.classList.add(
            'animate-slide-left',
            'order-first',
            'z-index-10'
          )
        } else {
          sliderList[item]?.classList.add(
            'animate-slide-left2',
            'order-2',
            'z-index-10'
          )
        }
      })

      min = min === sliderList.length - 1 ? 0 : min + 1
      max = max === sliderList.length - 1 ? 0 : max + 1
    }, 3500)

    return () => {
      intervalId && clearInterval(intervalId)
    }
  }, [])

  const handleClickBanner = (item) => {
    if (item?.type === 1) {
      dispatch(actions.setCurSongId(item.encodeId))
      dispatch(actions.play(true))
    } else if (item?.type === 4) {
      const albumPath = item?.link?.split('.')[0]
      navigate(albumPath)
    }
  }

  return (
    <div className="w-full overflow-hidden px-[59px]">
      <div className="flex gap-8 pt-8 ">
        {banner?.map((item, index) => (
          <img
            key={item.encodeId}
            src={item.banner}
            onClick={() => handleClickBanner(item)}
            className={`slider-item flex-1 object-contain w-[30%] rounded-lg ${
              index <= 2 ? 'block' : 'hidden'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default Slider
