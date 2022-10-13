import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Input, message, Popconfirm, Space, Switch, Table } from 'antd'
import './MainPage.css'
import {
  SettingOutlined,
  DeleteOutlined,
  KeyOutlined,
  UserOutlined,
  PlusCircleOutlined,
  SearchOutlined
} from '@ant-design/icons'
import { DelteUser, getUsers } from '../../services/usersAPI'
import { AddNewUserModal } from '../addNewUser/AddNewUserModal'
import { Link } from 'react-router-dom'

export var userInfo = []
export const MainPage = ({ updateList }) => {
  const [users, setUsers] = useState([])
  const [update, setUpdate] = useState(false)
  const [usersDataLoading, setUsersDataLoading] = useState(false)
  const [selectedRow, setSelectedRow] = useState()


  useEffect(() => {
    getUsersData()
  }, [update, updateList])


  userInfo = selectedRow


  function getFields(input, field) {
    var output = [];
    for (var i = 0; i < input.length; ++i)
      output.push({
        text: input[i][field],
        value: input[i][field]
      });


    return output;
  }

  let fullNameArray = getFields(users, "fullName")

  const getUsersData = async () => {
    setUsersDataLoading(true)
    const data = await getUsers()
    setUsersDataLoading(false)
    setUsers(data.data)
  }


  const columns = [
    {
      title: 'User',
      key: 'user',
      ellipsis: true,
      render: (_, record) => (
        <div className=' flex alignCenter '>
          <UserOutlined className='fs20px' />
          <div className='fdColumn flex ml15px'>
            <strong>{record.fullName}</strong>
            <small className='grey'>{record.email}</small>
          </div>
        </div>
      ),
      filterSearch: true,
      filters: fullNameArray,
      filterIcon: (filtered) => (
        <SearchOutlined
          className='fs20px'
          style={{
            color: filtered ? '#1890ff' : undefined,
          }}
        />
      ),
      onFilter: (value, record) => record.fullName.includes(value),
      width: '30%'
    },
    {
      title: 'Role',
      dataIndex: 'isAdmin',
      key: 'Role',
      sorter: (a, b) => a.isAdmin - b.isAdmin,
      sortDirections: ['ascend', 'descend'],
      render: (_, record) => (
        <>
          {record.isAdmin ? (
            <span>
              Admin <KeyOutlined />{' '}
            </span>
          ) : (
            <span>User</span>
          )}{' '}
        </>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => (
        <>{record.isActive ? <Switch disabled checked /> : <Switch  disabled />} </>
      ),

      sorter: (a, b) => a.isActive - b.isActive,
      sortDirections: ['ascend', 'descend'],
      width: '40%'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space onClick={() => setSelectedRow(record)} size='middle'>
          <Link to="/portal">
            <SettingOutlined className='pointer fs20px' />
          </Link>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => confirm(record.id)}
            okText="Yes"
            cancelText="No"
            disabled={record.id == 1}
          >
            <DeleteOutlined className='pointer fs20px' />
          </Popconfirm>
        </Space>
      ),
    }
  ]

  const defaultTitle = () => (
    <div className='flex fdColumn'>
      <h1>Users</h1>
      <AddNewUserModal update={update} setUpdate={setUpdate} />
    </div>
  )

  const confirm = async (id) => {

    const deleteUser = await DelteUser(id)
    if (deleteUser.success) {
      message.success('user deleted succesfully');
      setUpdate(!update)
    }

  };


  return (
    <div className='mainWrapper flex justifyCenter alignCenter'>
      <Table
        loading={usersDataLoading}
        title={() => defaultTitle()}
        columns={columns}
        dataSource={users ? users : undefined}
        footer={false}
        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '20'] }}
      />
    </div>
  )
}
