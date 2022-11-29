import React from 'react'
import icons from '../utils/icons'

const { HiOutlineSearch } = icons

const Search = () => {
  return (
    <div className="flex items-center text-gray-500">
      <span className="h-10 pl-4 flex items-center justify-center bg-[#DDE4E4] rounded-l-[20px]">
        <HiOutlineSearch size={20} />
      </span>
      <input
        type="text"
        className="outline-none bg-[#DDE4E4] px-4 py-2 rounded-r-[20px] h-10 w-full "
        placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
      />
    </div>
  )
}

export default Search
