import React from 'react';
import { Nav } from '@douyinfe/semi-ui';
import { IconSearch } from '@douyinfe/semi-icons';
import { Search } from '~/features/search/components';
import { NavbarFooter } from '~/features/user';
import styles from './NavBar.module.scss';

export default function NavBar({ user }) {
    return (
        <Nav className={styles.navBar} mode='horizontal'>
            <Nav.Footer>
                <NavbarFooter user={user} />
            </Nav.Footer>
        </Nav>
    );
}
