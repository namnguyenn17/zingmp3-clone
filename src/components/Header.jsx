import React from 'react'
import icons from '../utils/icons'
import Search from './Search'

const { HiArrowLeft, HiArrowRight } = icons

const Header = () => {
  return (
    <div className="w-full flex justify-between">
      <div className="w-full flex gap-6 items-center">
        <div className="flex text-gray-400 gap-5">
          <span>
            <HiArrowLeft size={24} />
          </span>
          <span>
            <HiArrowRight size={24} />
          </span>
        </div>
        <div className="w-1/2 ">
          <Search />
        </div>
      </div>

      <div>
        <div>Login</div>
      </div>
    </div>
  )
}

export default Header
