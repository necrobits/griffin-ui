import React from 'react';
import { Nav } from '@douyinfe/semi-ui';
import { NavbarFooter } from '~/features/user';
import { Link } from 'react-router-dom';

type Props = {
    styles: CSSModuleClasses;
    logo?: string;
};

export default function NavBar({ logo, styles }: Props) {
    return (
        <Nav className={styles.navBar} mode='horizontal'>
            <Nav.Header className={styles.navBarHeader}>
                {!!logo && (
                    <Link to={'/'}>
                        <img src={logo} width={'150px'} />
                    </Link>
                )}
                <div className={styles.content} id='navbarHeader-content'></div>
            </Nav.Header>
            <Nav.Footer>
                <NavbarFooter />
            </Nav.Footer>
        </Nav>
    );
}
