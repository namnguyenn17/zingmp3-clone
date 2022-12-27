/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as apis from '../apis'
import icons from '../utils/icons'
import * as actions from '../store/actions'
import { toast } from 'react-toastify'
import moment from 'moment'

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

let intervalId

const Player = () => {
  const { curSongId, isPlaying } = useSelector((state) => state.music)
  const [songInfo, setSongInfo] = useState(null)
  const [audio, setAudio] = useState(new Audio())
  const dispatch = useDispatch()
  const [curSeconds, setCurSeconds] = useState(0)
  const thumbRef = useRef()
  const trackRef = useRef()

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
        audio.pause()
        setAudio(new Audio(res2.data.data['128']))
      } else {
        setAudio(new Audio())
        dispatch(actions.play(false))
        toast.warn(res2.data.msg)
        setCurSeconds(0)
        thumbRef.current.style.cssText = `right: 100%`
      }
    }

    fetchDetailSong()
  }, [curSongId])

  const play = async () => {
    await audio.play()
  }

  useEffect(() => {
    intervalId && clearInterval(intervalId)

    audio.pause()
    audio.load()
    if (isPlaying) {
      play()
      intervalId = setInterval(() => {
        let percent =
          Math.round((audio.currentTime * 10000) / songInfo.duration) / 100

        thumbRef.current.style.cssText = `right: ${100 - percent}%`

        setCurSeconds(Math.round(audio.currentTime))
      }, 100)
    }
  }, [audio])

  const handleTogglePlayMusic = async () => {
    if (isPlaying) {
      audio.pause()
      dispatch(actions.play(false))
    } else {
      play()
      dispatch(actions.play(true))
    }
  }

  const handleClickProgressbar = (e) => {
    const trackRect = trackRef.current.getBoundingClientRect()
    let percent =
      Math.round(((e.clientX - trackRect.left) * 10000) / trackRect.width) / 100

    thumbRef.current.style.cssText = `right: ${100 - percent}%`
    audio.currentTime = (percent * songInfo.duration) / 100
    setCurSeconds(Math.round((percent * songInfo.duration) / 100))
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
        <div className="w-full flex items-center justify-center gap-2 text-xs">
          <span className="">
            {moment.utc(curSeconds * 1000).format('mm:ss')}
          </span>
          <div
            className="w-5/6 h-[3px] hover:h-[6px] m-auto relative rounded-l-full rounded-r-full bg-[rgba(0,0,0,0.1)] cursor-pointer"
            onClick={handleClickProgressbar}
            ref={trackRef}
          >
            <div
              ref={thumbRef}
              className="absolute top-0 left-0 bottom-0 rounded-l-full rounded-r-full bg-[#0e8080]"
            ></div>
          </div>
          <span>{moment.utc(songInfo?.duration * 1000).format('mm:ss')}</span>
        </div>
      </div>
      <div className="w-[30%] flex-auto border-red-500 border">Volume</div>
    </div>
  )
}

export default Player
