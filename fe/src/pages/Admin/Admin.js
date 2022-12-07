
import { Breadcrumb, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const { Header, Content, Footer, Sider } = Layout;

export default function Admin() {
  const [collapsed, setCollapsed] = useState(false);
  const { component, path } = useSelector(state => state.AdminReducer)
  const dispatch = useDispatch();
  const items = [
    {
      label: 'Movies',
      key: 1,
      onClick: () => {
        dispatch({
          type: 'Movies',
        })
      }
    },
    {
      label: 'Users',
      key: 2,
      onClick: () => {
        dispatch({
          type: 'Users',
        })
      }
    },
    {
      label: 'Showtimes',
      key: 3,
      onClick: () => {
        dispatch({
          type: 'Showtimes',
        })
      }
    },
  ]
  const user = JSON.parse(localStorage.getItem('user'))
  return (
    <div>
      {user.role === 'admin' ? <div>
        <Layout
          style={{
            minHeight: '100vh',
          }}
        >
          <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            {/* <div className="logo" /> */}
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
          </Sider>
          <Layout className="site-layout">
            <Header className="header flex justify-end">
              <div className={`flex items-center sm:hidden lg:flex relative cursor-pointer user`}>
                <img style={{width:30,height:30}} src={`https://ui-avatars.com/api/?name=${user.name}`}/>
                <span className="text-white">{user.name}</span>
              </div>
            </Header>
            <Content
              style={{
                margin: '0 16px',
              }}
            >
              <Breadcrumb
                style={{
                  margin: '16px 0',
                  color: '#000'
                }}
              >
                <Breadcrumb.Item>{path}</Breadcrumb.Item>
              </Breadcrumb>
              <div
                className="site-layout-background"
                style={{
                  padding: 0,
                  minHeight: 360,
                }}
              >
                {component}
              </div>
            </Content>
            <Footer
              style={{
                textAlign: 'center',
              }}
            >
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </div> : <div>You do not have access</div>
      }
    </div>
  )
}
