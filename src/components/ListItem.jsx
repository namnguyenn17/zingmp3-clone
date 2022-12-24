import moment from 'moment'
import React, { memo } from 'react'
import icons from '../utils/icons'

const { BsMusicNoteBeamed } = icons

const ListItem = ({ songData }) => {
  return (
    <div className="flex justify-between items-center p-[10px]">
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
      <div className="flex-1 flex justify-center">{songData?.album?.title}</div>
      <div className="flex-1 flex justify-end">
        {moment.utc(songData.duration * 1000).format('mm:ss')}
      </div>
    </div>
  )
}

export default memo(ListItem)
