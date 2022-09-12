import React from 'react';
import { Layout } from '@douyinfe/semi-ui';
import styles from './UserLayout.module.scss';
import ErrorBoundary from '~/containers/ErrorBoundary';

// components
import NavBar from './NavBar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { useResponsive } from '~/hooks/responsiveness';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '~/features/user';

const UserLayout = () => {
    const { Header, Sider, Content } = Layout;
    const user = useSelector(getCurrentUser);

    return (
        <Layout>
            <Header>
                <NavBar user={user} />
            </Header>
            <div className='container'>
                <Layout className={styles.layout}>
                    <Sider>
                        <Sidebar />
                    </Sider>
                    <Content className={styles.content}>
                        <ErrorBoundary>
                            <Outlet context={user} />
                        </ErrorBoundary>
                    </Content>
                </Layout>
            </div>
        </Layout>
    );
};

export default UserLayout;
