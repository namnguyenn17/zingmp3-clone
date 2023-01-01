import moment from 'moment'
import React, { memo } from 'react'
import icons from '../utils/icons'
import { useDispatch } from 'react-redux'
import * as actions from '../store/actions'

const { BsMusicNoteBeamed } = icons

const ListItem = ({ songData }) => {
  const dispatch = useDispatch()

  return (
    <div
      className="flex justify-between items-center p-[10px] border-t border-[#C3CECE] hover:bg-[#DDE4E4] cursor-pointer"
      onClick={() => {
        dispatch(actions.setCurSongId(songData?.encodeId))
        dispatch(actions.play(true))
        dispatch(actions.playAlbum(true))
      }}
    >
      <div className="flex items-center gap-2 flex-1">
        <span>
          <BsMusicNoteBeamed />
        </span>
        <img
          src={songData?.thumbnailM}
          å
          alt="thumbnail"
          className="w-10 h-10 object-cover rounded-md"
        />
        <span className="flex flex-col">
          <span className="text-sm font-semibold inline-block w-[180px] whitespace-nowrap !overflow-hidden text-ellipsis">
            {songData?.title}
          </span>
          <span>{songData?.artistsNames}</span>
        </span>
      </div>
      <div className="flex-1 flex justify-end">
        <span className="inline-block w-[180px] whitespace-nowrap !overflow-hidden text-ellipsis">
          {songData?.album?.title}
        </span>
      </div>
      <div className="flex-1 flex justify-end">
        {moment.utc(songData.duration * 1000).format('mm:ss')}
      </div>
    </div>
  )
}

export default memo(ListItem)
