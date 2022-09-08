import React from 'react';
import { Nav } from '@douyinfe/semi-ui';
import { IconBell, IconDesktop, IconSemiLogo, IconSetting, IconUser, IconUserGroup } from '@douyinfe/semi-icons';
import './Sidebar.scss'
import { useNavigate } from 'react-router-dom';

export default function Sidebar () {
  const navigate = useNavigate();
  return (
    <Nav
      className='sidebar-nav'
      defaultSelectedKeys={['users']}
      defaultOpenKeys={['admin']}
    >
        <Nav.Header className="navHeader">
          <IconSemiLogo />
          <h1>Griffin</h1>
        </Nav.Header>

        <Nav.Item itemKey='profile' text='Profile' icon={<IconUser size='large' />}/>
        <Nav.Item itemKey='account' text='Account' icon={<IconDesktop size='large' />} />
        <Nav.Item itemKey='notifications' text='Notifications' icon={<IconBell size='large' />} />

        <Nav.Sub itemKey='admin' text="Admin" icon={<IconUser style={{color: '#333'}} />}>
          <Nav.Item itemKey='users' text='Users' icon={<IconUserGroup size='large' />} onClick={() => navigate('/users')}/>
          <Nav.Item itemKey='clients' text='Clients' icon={<IconDesktop size='large' />} />
          <Nav.Item itemKey='setting' text='Setting' icon={<IconSetting size='large' />} />
        </Nav.Sub>
    </Nav>
  )
}
