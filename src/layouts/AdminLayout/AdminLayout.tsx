import React, { useState } from 'react';
import styles from './AdminLayout.module.scss';
import navBarStyles from '~/theme/scss/NavBar/AdminNavBar.module.scss';
import { Layout } from '@douyinfe/semi-ui';
import { Outlet } from 'react-router-dom';
import ErrorBoundary from '~/containers/ErrorBoundary';

// components
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '~/features/user';
import NavBar from '~/components/NavBar';
import { useResponsive } from '~/hooks/responsiveness';
const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
    const { isDesktop, isTablet } = useResponsive();

    const desktopLayout = (
        <>
            <Sider className={styles.sider}>
                <Sidebar />
            </Sider>
            <Layout>
                <Header className={styles.header}>
                    <NavBar styles={navBarStyles} />
                </Header>
                <Content className={styles.content}>
                    <div className={styles.dash}>
                        <ErrorBoundary>
                            <Outlet />
                        </ErrorBoundary>
                    </div>
                </Content>
            </Layout>
        </>
    );

    const tabletLayout = (
        <>
            <Header className={styles.header}>
                <NavBar styles={navBarStyles} />
            </Header>
            <Sider className={styles.sider}>
                <Sidebar />
            </Sider>
            <Content className={styles.content}>
                <div className={styles.dash}>
                    <ErrorBoundary>
                        <Outlet />
                    </ErrorBoundary>
                </div>
            </Content>
        </>
    );

    return (
        <>
            <Layout className={styles.layout}>{isDesktop ? desktopLayout : tabletLayout}</Layout>
        </>
    );
};

export default AdminLayout;
