import React, { useState } from 'react';
import styles from './AdminLayout.module.scss';
import { Layout } from '@douyinfe/semi-ui';
import { Outlet } from 'react-router-dom';
import ErrorBoundary from '~/containers/ErrorBoundary';

// components
import NavBar from './NavBar';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '~/features/user';
import { Search } from '~/features/search/components';
import { IconSearch } from '@douyinfe/semi-icons';
const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
    const user = useSelector(getCurrentUser);

    return (
        <>
            <Search placeholder={'Search...'} prefix={<IconSearch />} size='large' showClear />
            <Layout>
                <Sider>
                    <Sidebar />
                </Sider>
                <Layout>
                    <Header>
                        <NavBar user={user} />
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
