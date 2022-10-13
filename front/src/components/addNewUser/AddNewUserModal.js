import { KeyOutlined, MailOutlined, PlusCircleOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Input, message, Modal, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { postNewUser } from '../../services/usersAPI'
import { CommonInputs, validationError } from '../commonInputs/CommonInputs'
import './AddNewUserModal.css'

export const AddNewUserModal = ({ setUpdate, update }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [postUsersLoading, setPostUsersLoading] = useState(false)
  const [postUsersSuccess, setPostUsersSuccess] = useState(false)
  const [userData, setUserData] = useState({
    fullName:'',
    email:'',
    role:null
  })



  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const modalTitle = () => {
    return (
      <div className=' flex fdColumn  '>
        <strong>Invite new user</strong>
        <small className='grey'>Fill in all the fields</small>
      </div>
    )
  }

  let newUserData = {
    fullName: userData.fullName,
    email: userData.email,
    isAdmin: userData.role? JSON.parse(userData.role) : null,
    isActive: false
  }

  const sendInvitation = async () => {
    setPostUsersLoading(true)
    setPostUsersSuccess(false)
    const post = await postNewUser(newUserData)
    setPostUsersLoading(false)
    if (post.success) {
      setPostUsersSuccess(true)
      message.success('invitation sent succesfully!')
    }
    else {
      message.error('Something went wrong!')
    }

    setUpdate(!update)
  }
  const getInputsValue = (fullName, email, role) => {
    return setUserData({ fullName, email, role })

  }
  return (
    <>
      <PlusCircleOutlined
        onClick={showModal}
        style={{ color: '#2a84ff' }}
        className='fs50px blue pointer alSelfBaseline'
      />
      <Modal
        title={modalTitle()}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <CommonInputs disable={false} clearInputs={postUsersSuccess} getInputsValue={getInputsValue} />
        <Button disabled={validationError} loading={postUsersLoading} onClick={sendInvitation} className='sendInvitation-btn pointer'>Send Invitation</Button>
      </Modal>
    </>
  )
}
