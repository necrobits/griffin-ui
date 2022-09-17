import React, { useEffect, useState } from 'react';
import { Nav } from '@douyinfe/semi-ui';
import { IconDesktop, IconUserGroup } from '@douyinfe/semi-icons';
import styles from './Sidebar.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from 'assets/images/logo.png';
import { useResponsive } from '~/hooks/responsiveness';

const keyPath = {
    users: '/admin/users',
    clients: '/admin/clients'
};

const getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
};

export default function Sidebar() {
    const { isDesktop } = useResponsive();

    const navigate = useNavigate();
    const location = useLocation();
    const isPathOnNav = Object.values(keyPath).includes(location.pathname);
    const [selectedKeys, setSelectedKeys] = useState(isPathOnNav ? [getKeyByValue(keyPath, location.pathname)] : []);

    useEffect(() => {
        setSelectedKeys(isPathOnNav ? [getKeyByValue(keyPath, location.pathname)] : []);
    }, [location]);

    const manageItems = (
        <>
            <Nav.Item itemKey='users' text='Users' icon={<IconUserGroup size='large' />} />
            <Nav.Item itemKey='clients' text='Clients' icon={<IconDesktop size='large' />} />
        </>
    );

    const onSelect = ({ itemKey }) => {
        setSelectedKeys([itemKey]);
        navigate(`${keyPath[itemKey]}`);
    };

    return (
        <Nav selectedKeys={selectedKeys} className={styles.sideNav} onSelect={onSelect} mode={isDesktop ? 'vertical' : 'horizontal'}>
            {isDesktop && (
                <Nav.Header>
                    <Link to={'/'}>
                        <img src={logo} width={'150px'} />
                    </Link>
                </Nav.Header>
            )}
            {manageItems}
        </Nav>
    );
}
