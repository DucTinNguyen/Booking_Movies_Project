import React, { useEffect } from 'react'
import axios from 'axios'
import { DOMAIN } from '../../utility/setting'
import { useDispatch, useSelector } from 'react-redux';
import { GET_USER } from '../../redux/types/UserType/userType';
import { Space, Table, Tag, Button } from 'antd';

const columns = [
  {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
  },
  {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
  },
  {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
  },
  {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
  },
  {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
          <Space size="middle">
              <Button type="danger" onClick={()=>{handleDeleteUser(record.id)}}>Delete</Button>
          </Space>
      ),
  },
];

const handleDeleteUser = async (id)=>{
  await axios({
      method: 'DELETE',
      url:`${DOMAIN}/user/${id}`
  })
  window.location.reload(false)
}



export default function User() {
  const dispatch = useDispatch();
  const {users} = useSelector(state => state.UserReducer)
  useEffect(() => {
    dispatch({
      type: GET_USER
    })
  },[])
  const data = users;
  return (  
    <div>
            <Table columns={columns} dataSource={data}/>;

    </div>
  )
}
