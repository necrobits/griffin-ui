import React, { useState } from 'react';
import { Avatar, Button, Dropdown, Input, Nav } from '@douyinfe/semi-ui';
import { IconBell, IconEdit, IconHelpCircle, IconHome, IconLive, IconQuit, IconSearch, IconSemiLogo, IconSetting } from '@douyinfe/semi-icons';
import './NavBar.scss';
import { useResponsive } from '~/hooks/responsiveness';
import { Search } from '~/features/search/components';

export default function NavBar() {
    const { isMobile } = useResponsive();
    const [showNavFooter, setShowNavFooter] = useState(true);

    const searchOnFocus = () => {
        if (isMobile) {
            setShowNavFooter(false);
        }
    };

    const searchOnBlur = () => {
        setShowNavFooter(true);
    };

    return (
        <Nav className='navBar' mode='horizontal' defaultSelectedKeys={['Home']}>
            <Nav.Header className='navBarHeader'>
                <Search prefix={<IconSearch />} placeholder={!isMobile ? 'Search users ...' : ''} size='large' showClear onFocus={searchOnFocus} onBlur={searchOnBlur} />
            </Nav.Header>
            {showNavFooter && (
                <Nav.Footer className='navBarFooter'>
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
                    <Dropdown
                        trigger='click'
                        position='bottomRight'
                        render={
                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    <IconEdit />
                                    Edit profile
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <IconSetting />
                                    Settings
                                </Dropdown.Item>
                                <Dropdown.Item style={{ color: 'red' }}>
                                    <IconQuit />
                                    Sign out
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        }>
                        <Avatar color='orange' size='small'>
                            YJ
                        </Avatar>
                    </Dropdown>
                </Nav.Footer>
            )}
        </Nav>
    );
}
