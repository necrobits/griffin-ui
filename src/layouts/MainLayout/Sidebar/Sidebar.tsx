import React from 'react';
import { Nav } from '@douyinfe/semi-ui';
import { IconDesktop, IconSemiLogo, IconSetting, IconUser } from '@douyinfe/semi-icons';
import './Sidebar.scss'

export default function Sidebar () {
  return (
    <Nav
      style={{
        height: '100%',
      }}
      defaultSelectedKeys={['Users']}
    >
        <Nav.Header className="navHeader">
          <IconSemiLogo />
          <h1>Griffin</h1>
        </Nav.Header>
        <Nav.Item itemKey='Users' text='Users' icon={<IconUser size='large' />} />
        <Nav.Item itemKey='Clients' text='Clients' icon={<IconDesktop size='large' />} />
        <Nav.Item itemKey='Setting' text='Setting' icon={<IconSetting size='large' />} />
    </Nav>
  )
}
