import React from 'react';
import { Avatar, Button, Nav } from '@douyinfe/semi-ui';
import { IconBell, IconHelpCircle, IconHome, IconLive, IconSemiLogo, IconSetting } from '@douyinfe/semi-icons';

export default function NavBar() {
    return (
        <Nav
            style={{
                position: 'fixed',
                top: 0,
                width: '100%',
                backgroundColor: 'transparent'
            }}
            mode='horizontal'
            defaultSelectedKeys={['Home']}>
            <Nav.Header>
                <IconSemiLogo style={{ fontSize: 36 }} />
            </Nav.Header>
            <Nav.Item itemKey='Home' text='Home' icon={<IconHome size='large' />} />
            <Nav.Item itemKey='Live' text='Live' icon={<IconLive size='large' />} />
            <Nav.Item itemKey='Setting' text='Setting' icon={<IconSetting size='large' />} />
            <Nav.Footer>
                <Button
                    theme='borderless'
                    icon={<IconBell size='large' />}
                    style={{
                        color: 'var(--semi-color-text-2)',
                        marginRight: '12px'
                    }}
                />
                <Button
                    theme='borderless'
                    icon={<IconHelpCircle size='large' />}
                    style={{
                        color: 'var(--semi-color-text-2)',
                        marginRight: '12px'
                    }}
                />
                <Avatar color='orange' size='small'>
                    YJ
                </Avatar>
            </Nav.Footer>
        </Nav>
    );
}
