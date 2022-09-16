import React from 'react';
import { Nav } from '@douyinfe/semi-ui';
import { IconSearch } from '@douyinfe/semi-icons';
import { Search } from '~/features/search/components';
import { NavbarFooter } from '~/features/user';
import styles from './NavBar.module.scss';
import logo from 'assets/images/logo.png';
import { Link } from 'react-router-dom';

export default function NavBar({ user }) {
    return (
        <Nav className={styles.navBar} mode='horizontal'>
            <Nav.Header className={styles.navbarHeader}>
                <div className={styles.content} id='navbarHeader-content'></div>
            </Nav.Header>
            <Nav.Footer>
                <NavbarFooter user={user} />
            </Nav.Footer>
        </Nav>
    );
}
