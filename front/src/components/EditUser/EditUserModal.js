import { KeyOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Divider, message, Modal, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditUser } from '../../services/usersAPI';
import { CommonInputs, validationError } from '../commonInputs/CommonInputs';
import { userInfo } from '../Main/MainPage';
import './EditUser.css'
export const EditUserModal = ({setUpdateList,updateList}) => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const [editUsersLoading, setEditUsersLoading] = useState(false)
    const [editUsersSuccess, setEditUsersSuccess] = useState(false)
    const [userData, setUserData] = useState({
        fullName:'',
        email:'',
        role:null,
        isActive:false
      })
    

    const navigate = useNavigate()
    useEffect(()=>{
        setIsActive(userInfo?.isActive)
    },[userInfo])

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        navigate('/')
    };

    

    const modalTitle = () => {
        return (
            <div className=' flex fdColumn  '>
                <strong>User setup</strong>
                <small className='grey'>information</small>
            </div>
        )
    }

    const getInputsValue = (fullName, email, role) => {
        return setUserData({ fullName, email, role})
    
      }

      let updatedData={
        fullName:userData.fullName,
        email:userData.email,
        isAdmin: userData.role? JSON.parse(userData.role) : null,
        isActive: isActive
      }
      const updateUser = async () => {
        setEditUsersLoading(true)
        setEditUsersSuccess(false)
        const post = await EditUser(userInfo?.id,updatedData)
        setEditUsersLoading(false)
        if (post.success) {
          setEditUsersSuccess(true)
          message.success('User Updated succesfully!')
        }
        else {
          message.error('Something went wrong')
        }
    
        setUpdateList(!updateList)
      }
    return (
        <>
            <Modal style={{ marginTop: '100px' }} footer={false} title={modalTitle()} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className='editUserModalWrapper'>
                    <div className=' flex alignCenter '>
                        <UserOutlined className='fs20px' />
                        <div className='fdColumn flex ml15px'>
                            <strong>{userInfo?.fullName} <KeyOutlined/></strong>
                            <small className='grey'>{userInfo?.email}</small>
                        </div>
                    </div>
                    <Button hidden={isActive? false : true} className='resendInvitation pointer'>Resend the invite</Button>
                    <Divider />
                    <div className='flex spaceBetween'>
                        <h4>Details</h4>
                        <div className='df'>
                            <small> {userInfo?.isActive ? 'this user is active' : 'this user  is inactive'} </small>
                            <Switch onChange={(e)=>setIsActive(e)} checked={isActive} className='ml10px' />
                        </div>
                    </div>
                    <CommonInputs disable={!isActive} clearInputs={false} getInputsValue={getInputsValue} data={userInfo} />
                </div>
                <Button disabled={validationError} loading={editUsersLoading} onClick={updateUser} className='sendInvitation-btn pointer'>Save Changes</Button>
            </Modal>
        </>
    );
};
