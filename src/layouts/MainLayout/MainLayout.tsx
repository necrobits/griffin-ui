import React, { useEffect, useState } from 'react';
import { Layout } from '@douyinfe/semi-ui';
import './MainLayout.scss';
import ErrorBoundary from '~/containers/ErrorBoundary';

// components
import NavBar from './NavBar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { useResponsive } from '~/hooks/responsiveness';

const MainLayout = () => {
    const { Header, Sider, Content } = Layout;
    const { isDesktop, isTablet } = useResponsive();

    return (
        <Layout>
            {isDesktop && (
                <Sider className='sider'>
                    <Sidebar />
                </Sider>
            )}
            <Layout className={isTablet ? 'main-layout' : ''}>
                <Header>
                    <NavBar />
                </Header>
                {isTablet && (
                    <Sider className='sider'>
                        <Sidebar />
                    </Sider>
                )}
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
