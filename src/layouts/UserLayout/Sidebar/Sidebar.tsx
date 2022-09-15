import React, { useEffect, useState } from 'react';
import { Nav } from '@douyinfe/semi-ui';
import { IconDesktop, IconEyeOpened, IconUserSetting } from '@douyinfe/semi-icons';
import styles from './Sidebar.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useResponsive } from '~/hooks/responsiveness';

const keyPath = {
    profile: '/me',
    account: '/me/settings/account',
    applications: '/me/settings/applications'
};

const getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
};

export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedKeys, setSelectedKeys] = useState([getKeyByValue(keyPath, location.pathname)]);

    useEffect(() => {
        setSelectedKeys([getKeyByValue(keyPath, location.pathname)]);
    }, [location]);

    const onSelect = ({ itemKey }) => {
        setSelectedKeys([itemKey]);
        navigate(`${keyPath[itemKey]}`);
    };

    const navItems = (
        <>
            <Nav.Item className={styles.item} itemKey='profile' text='Profile' icon={<IconEyeOpened size='large' />} />
            <Nav.Item className={styles.item} itemKey='account' text='Account' icon={<IconUserSetting size='large' />} />
            <Nav.Item className={styles.item} itemKey='applications' text='Applications' icon={<IconDesktop size='large' />} />
        </>
    );
    return (
        <Nav selectedKeys={selectedKeys} className={styles.sideNav} onSelect={onSelect}>
            {navItems}
        </Nav>
    );
}
