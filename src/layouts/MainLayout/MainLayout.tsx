import React from 'react';
import { Layout } from '@douyinfe/semi-ui';

import ErrorBoundary from '~/containers/ErrorBoundary';

// components
import NavBar from './NavBar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    const { Header, Sider, Content } = Layout;
    return (
        <Layout>
            <Sider>
                <Sidebar />
            </Sider>
            <Layout>
                <Header>
                    <NavBar />
                </Header>
                <Content
                    style={{
                        padding: '2rem',
                        height: 'calc(100vh - 80px)',
                        overflowY: 'scroll'
                    }}>
                    <ErrorBoundary>
                        <Outlet />
                    </ErrorBoundary>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
