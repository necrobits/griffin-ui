import React from 'react';
import { Layout } from '@douyinfe/semi-ui';
import './MainLayout.scss';
import ErrorBoundary from '~/containers/ErrorBoundary';

// components
import NavBar from './NavBar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    const { Header, Sider, Content } = Layout;
    return (
        <Layout className='main-layout responsive'>
            <Sider className='sider'>
                <Sidebar />
            </Sider>
            <Layout>
                <Header>
                    <NavBar />
                </Header>
                <Content className='content'>
                    <ErrorBoundary>
                        <Outlet />
                    </ErrorBoundary>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
