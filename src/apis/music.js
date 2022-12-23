import axios from '../axios'

export const getInfoSong = (sid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: '/api/infosong',
        method: 'GET',
        params: { id: sid },
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })

export const getSong = (sid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: '/api/song',
        method: 'get',
        params: { id: sid },
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })

export const getDetailPlaylist = (pid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: '/api/detailplaylist',
        method: 'get',
        params: { id: pid },
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
