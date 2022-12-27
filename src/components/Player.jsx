/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as apis from '../apis'
import icons from '../utils/icons'
import * as actions from '../store/actions'
import { toast } from 'react-toastify'

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
  const audioEl = useRef(new Audio())
  const { curSongId, isPlaying } = useSelector((state) => state.music)
  const [songInfo, setSongInfo] = useState(null)
  const [source, setSource] = useState(null)
  const dispatch = useDispatch()

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
        setSource(res2.data.data['128'])
      } else {
        dispatch(actions.play(false))
        audioEl.current.src = undefined
        audioEl.current.pause()
        toast.info(res2.data.msg)
      }
    }

    fetchDetailSong()
  }, [curSongId])

  const play = async () => {
    await audioEl.current.play()
  }

  useEffect(() => {
    audioEl.current.pause()
    audioEl.current.src = source
    audioEl.current.load()

    if (isPlaying) {
      play()
    }
  }, [curSongId, source])

  const handleTogglePlayMusic = async () => {
    if (isPlaying) {
      audioEl.current.pause()
      dispatch(actions.play(false))
    } else {
      play()
      dispatch(actions.play(true))
    }
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
            onClick={handleTogglePlayMusic}
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
