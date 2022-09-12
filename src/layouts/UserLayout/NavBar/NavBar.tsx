import React, { useState } from 'react';
import { Nav } from '@douyinfe/semi-ui';
import { IconSearch } from '@douyinfe/semi-icons';
import styles from './NavBar.module.scss';
import { useResponsive } from '~/hooks/responsiveness';
import { Search } from '~/features/search/components';
import { NavbarFooter } from '~/features/user';
import logo from 'assets/images/logo.png';
import { Link } from 'react-router-dom';

export default function NavBar({ user }) {
    return (
        <Nav className={styles.navbar} mode='horizontal' defaultSelectedKeys={['Home']}>
            <Nav.Header className={styles.navHeader}>
                <Link to={'/'}>
                    <img src={logo} width={'150px'} />
                </Link>
            </Nav.Header>
            <Nav.Footer className={styles.navFooter}>
                <NavbarFooter user={user} />
            </Nav.Footer>
        </Nav>
    );
}
