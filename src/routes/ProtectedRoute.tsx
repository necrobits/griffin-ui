import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import _ from 'lodash';
import Forbidden from '~/components/Forbidden/Forbidden';
import { LStorage } from '~/storage';
import { AUTH_TOKEN, PERSIST } from '~/constants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchedUser, getCurrentUser, isAuthingUser } from '~/features/user';
import { Spin } from '@douyinfe/semi-ui';
import { useGetMe } from '~/hooks/queries/useGetMe';

type Props = {
    component: React.ComponentType;
    redirectPath?: string;
    requiredRoles?: string[] | [];
};

const ProtectedRoute: React.FC<Props> = ({ component: RouteComponent, redirectPath = '/login', requiredRoles = [] }: Props) => {
    const persist = LStorage.getItem(PERSIST, false);
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
    const routeRoles = requiredRoles.map(role => role.toLowerCase());
    const userScopes = (user?.roles ? user.roles : []).map(scope => scope.toLowerCase());

    if (!user || !LStorage.getItem(AUTH_TOKEN)) {
        if (persist) {
            return <Navigate to='/redirect' state={{ redirectPath: location.pathname }} />;
        }
        return <Navigate to={redirectPath} state={{ referrer: location }} />;
    }
    if (routeRoles.length > 0) {
        if (_.intersection(routeRoles, userScopes).length === 0) {
            return <Forbidden />;
        }
    }
    return <RouteComponent />;
};

export default ProtectedRoute;
