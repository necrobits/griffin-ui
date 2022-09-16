import React from 'react';
import { Layout } from '@douyinfe/semi-ui';
import styles from './UserLayout.module.scss';
import ErrorBoundary from '~/containers/ErrorBoundary';

// components
import NavBar from './NavBar';
import Sidebar from './Sidebar';
import { Outlet, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '~/features/user';
import { useFetchUser } from '~/features/users/hooks';

const UserLayout = () => {
    const { Header, Sider, Content } = Layout;
    const currentUser = useSelector(getCurrentUser);
    const { userId } = useParams();

    const { isLoading, data: user } = useFetchUser(userId);

    return (
        <Layout>
            <Header>
                <NavBar user={currentUser} />
            </Header>
            <div className='container'>
                <Layout className={styles.layout}>
                    <Sider>
                        <Sidebar userId={userId} />
                    </Sider>
                    <Content className={styles.content}>
                        <ErrorBoundary>{isLoading ? <p>Loading ...</p> : <Outlet context={user} />}</ErrorBoundary>
                    </Content>
                </Layout>
            </div>
        </Layout>
    );
};

export default UserLayout;
