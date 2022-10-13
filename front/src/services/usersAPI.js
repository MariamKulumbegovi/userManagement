import { CallAPI } from './CallAPI'

export const postNewUser = data =>
  CallAPI({
    url: 'users',
    method: 'post',
    data: data,
  })

export const EditUser = (id, data) =>
  CallAPI({
    url:`users/${id}`,
    method: 'put',
    data: data,
  })

  export const DelteUser = (id) =>
  CallAPI({
    url:`users/${id}`,
    method: 'delete',
  })

export const getUsers = _ =>
  CallAPI({
    url: 'users',
    method: 'get'
  })
