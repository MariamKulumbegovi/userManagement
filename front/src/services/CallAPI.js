import axios from 'axios'

export const CallAPI = async config => {
  return await axios
    .request(config)
    .then(({ data, headers }) => {
      return {data,success:true}
    })
    .catch(error => {
      return Promise.reject(error)
    })
}
