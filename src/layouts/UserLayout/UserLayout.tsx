import React from 'react';
import { Layout } from '@douyinfe/semi-ui';
import styles from './UserLayout.module.scss';
import navBarStyles from '~/theme/scss/NavBar/UserNavBar.module.scss';
import ErrorBoundary from '~/containers/ErrorBoundary';

// components
import Sidebar from './Sidebar';
import { Outlet, useParams } from 'react-router-dom';
import { useFetchUser } from '~/features/users/hooks';
import NavBar from '~/components/NavBar';

import logo from 'assets/images/logo.png';

const UserLayout = () => {
    const { Header, Sider, Content } = Layout;
    const { userId } = useParams();

    const { isLoading, data: user } = useFetchUser(userId);

    return (
        <Layout>
            <Header>
                <NavBar logo={logo} styles={navBarStyles} />
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
