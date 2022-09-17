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
const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
    return (
        <>
            <Layout>
                <Sider>
                    <Sidebar />
                </Sider>
                <Layout>
                    <Header>
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
            </Layout>
        </>
    );
};

export default AdminLayout;
