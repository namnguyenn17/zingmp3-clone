import React, { memo } from 'react'
import { ListItem } from './'

const ListSong = ({ songs, totalDuration }) => {
  return (
    <div className="w-full flex flex-col text-xs text-gray-600">
      <div className="flex justify-between items-center p-[10px] font-semibold">
        <span>BÀI HÁT</span>
        <span>ALBUM</span>
        <span>THỜI GIAN</span>
      </div>
      <div className="flex flex-col">
        {songs?.map((item) => (
          <ListItem key={item.encodeId} songData={item} />
        ))}
      </div>
    </div>
  )
}

export default memo(ListSong)
