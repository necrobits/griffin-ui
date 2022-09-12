import React, { useState } from 'react';
import { Nav } from '@douyinfe/semi-ui';
import { IconBell, IconDesktop, IconEyeOpened, IconUserCircle, IconUserSetting } from '@douyinfe/semi-icons';
import styles from './Sidebar.module.scss';
import { useNavigate } from 'react-router-dom';
import { useResponsive } from '~/hooks/responsiveness';

const keyPath = {
    overview: '',
    profile: 'settings/profile',
    account: 'settings/account',
    notifications: 'settings/notifications',
    applications: 'settings/applications'
};

export default function Sidebar() {
    const navigate = useNavigate();
    const [selectedKeys, setSelectedKeys] = useState(['overview']);

    const onSelect = ({ itemKey }) => {
        setSelectedKeys([itemKey]);
        navigate(`/me/${keyPath[itemKey]}`);
    };

    const navItems = (
        <>
            <Nav.Item className={styles.item} itemKey='overview' text='Overview' icon={<IconEyeOpened size='large' />} />
            <Nav.Item className={styles.item} itemKey='profile' text='Profile' icon={<IconUserCircle size='large' />} />
            <Nav.Item className={styles.item} itemKey='account' text='Account' icon={<IconUserSetting size='large' />} />
            <Nav.Item className={styles.item} itemKey='notifications' text='Notifications' icon={<IconBell size='large' />} />
            <Nav.Item className={styles.item} itemKey='applications' text='Applications' icon={<IconDesktop size='large' />} />
        </>
    );
    return (
        <Nav selectedKeys={selectedKeys} className={styles.sideNav} onSelect={onSelect}>
            {navItems}
        </Nav>
    );
}
