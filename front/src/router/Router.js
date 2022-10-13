import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Portal from '../components/EditUser/EditUser.js'
import { EditUserModal } from '../components/EditUser/EditUserModal.js'
import { MainPage } from '../components/Main/MainPage.js'
import * as path from './paths.js'

export const Router = ({setUpdateList,updateList}) => {
  return (
    <Routes>
      <Route element={<><Portal><EditUserModal updateList={updateList} setUpdateList={setUpdateList} /></Portal></>} path="/portal" />
    </Routes>
  )
}
