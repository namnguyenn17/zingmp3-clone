import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import * as apis from '../apis'
import icons from '../utils/icons'

const {
  AiOutlineHeart,
  AiFillHeart,
  BsThreeDots,
  MdSkipNext,
  MdSkipPrevious,
  TbRepeat,
  IoShuffleOutline,
  BsFillPlayFill,
  BsPauseFill,
} = icons

const Player = () => {
  const audioEl = new Audio(
    'https://mp3-s1-zmp3.zmdcdn.me/8fa4ea68b2285b760239/3718277703496172093?authen=exp=1671259849~acl=/8fa4ea68b2285b760239/*~hmac=8ce71ff86ce0c6c4988690006158cb15&fs=MTY3MTA4NzA0OTMyMXx3ZWJWNnwwfDExNS43Ny4xODQdUngMTAy'
  )
  const { curSongId, isPlaying } = useSelector((state) => state.music)
  const [songInfo, setSongInfo] = useState(null)
  const [source, setSource] = useState(null)

  console.log(isPlaying)

  useEffect(() => {
    const fetchDetailSong = async () => {
      const [res1, res2] = await Promise.all([
        apis.getInfoSong(curSongId),
        apis.getSong(curSongId),
      ])

      if (res1.data.err === 0) {
        setSongInfo(res1.data.data)
      }
      if (res2.data.err === 0) {
        setSource(res2.data.data['123'])
      }
    }

    fetchDetailSong()
  }, [curSongId])

  useEffect(() => {
    audioEl.play()
  })

  const handlePlayToggleMusic = () => {
    // setIsPlaying((prev) => !prev)
  }

  return (
    <div className="bg-main-400 px-5 h-full flex">
      <div className="w-[30%] flex flex-auto items-center gap-4">
        <img
          src={songInfo?.thumbnail}
          alt="thumbnail"
          className="w-16 h-16 object-cover rounded-md"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-gray-700 text-sm">
            {songInfo?.title}
          </span>
          <span className="text-xs text-gray-500">
            {songInfo?.artistsNames}
          </span>
        </div>
        <div className="flex gap-4 pl-2">
          <span>
            <AiOutlineHeart size={16} />
          </span>
          <span>
            <BsThreeDots size={16} />
          </span>
        </div>
      </div>
      <div className="w-[40%] flex flex-auto flex-col items-center justify-center gap-1 py-2">
        <div className="flex gap-8 items-center justify-center">
          <span className="cursor-pointer" title="Bật phát ngẫu nhiên">
            <IoShuffleOutline size={24} />
          </span>
          <span className="cursor-pointer">
            <MdSkipPrevious size={24} />
          </span>
          <span
            className="p-1 border border-gray-700 hover:text-main-500 rounded-full cursor-pointer"
            onClick={() => handlePlayToggleMusic()}
          >
            {isPlaying ? (
              <BsPauseFill size={28} />
            ) : (
              <BsFillPlayFill size={28} />
            )}
          </span>
          <span className="cursor-pointer">
            <MdSkipNext size={24} />
          </span>
          <span className="cursor-pointer" title="Bật phát tất cả">
            <TbRepeat size={24} />
          </span>
        </div>
        <div>Progress bar</div>
      </div>
      <div className="w-[30%] flex-auto border-red-500 border">Volume</div>
    </div>
  )
}

export default Player
