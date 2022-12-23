import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as apis from '../../apis'
import moment from 'moment/moment'

const Album = () => {
  const { title, pid } = useParams()
  const [playlistData, setPlaylistData] = useState({})

  console.log({ title, pid })

  useEffect(() => {
    const fetchDetailPlaylist = async () => {
      const response = await apis.getDetailPlaylist(pid)

      if (response?.data.err === 0) {
        setPlaylistData(response?.data?.data)
      }
    }

    fetchDetailPlaylist()
  }, [pid])

  return (
    <div className="flex gap-8 w-full p-[59px]">
      <div className="flex-none w-1/4 flex flex-col items-center gap-2">
        <img
          src={playlistData?.thumbnailM}
          alt="thumbnail"
          className="w-full object-contain rounded-md shadow-md"
        />
        <div className="flex flex-col items-center gap-1">
          <h3 className="text-[20px] font-bold text-gray-700">
            {playlistData?.title}
          </h3>
          <span className="flex gap-2 items-center text-gray-500 text-xs">
            <span>Cập nhât: </span>
            <span>
              {moment
                .unix(playlistData?.contentLastUpdate)
                .format('DD/MM/YYYY')}
            </span>
          </span>
          <span className="flex gap-2 items-center text-gray-500 text-xs text-center">
            {playlistData?.artistsNames}
          </span>
          <span className="flex gap-2 items-center text-gray-500 text-xs ">
            {playlistData?.like} người yêu thích
          </span>
        </div>
      </div>
      <div className="flex-auto border border-blue-500">Playlist</div>
    </div>
  )
}

export default Album
