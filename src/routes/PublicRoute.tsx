import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCurrentUser, isAuthingUser } from '~/features/user';
import { Spin } from '@douyinfe/semi-ui';

type Props = {
    component: React.ComponentType;
    redirectPath?: string;
    requiredRoles?: string[] | [];
};

const PublicRoute = ({ component: RouteComponent, redirectPath }: Props) => {
    const isAuthing = useSelector(isAuthingUser);
    const user = useSelector(getCurrentUser);
    const location = useLocation();

    if (isAuthing) {
        return (
            <Spin
                spinning={true}
                size='large'
                style={{
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            />
        );
    }
    if (user) {
        const state = location.state as Record<string, any> | undefined;
        if (!!state && state.referrer) {
            const to = {
                pathname: state.referrer.pathname,
                search: state.referrer.search
            };

            return <Navigate to={to} state={{ replace: true }} />;
        } else if (location.pathname === '/login' || location.pathname === '/signup') {
            return <Navigate to='/' />;
        } else if (redirectPath) {
            return <Navigate to={redirectPath} state={{ replace: true }} />;
        }
    }

    return <RouteComponent />;
};

export default PublicRoute;
