import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import _ from 'lodash';
import { LStorage } from '~/storage';
import { AUTH_TOKEN } from '~/constants';
import { useSelector } from 'react-redux';
import { getCurrentUser, isAuthingUser } from '~/features/user';
import { Spin } from '@douyinfe/semi-ui';

type Props = {
    component: React.ComponentType;
};

const DynamicRoute: React.FC<Props> = ({ component: RouteComponent }) => {
    const user = useSelector(getCurrentUser);

    if (!user || !LStorage.getItem(AUTH_TOKEN)) {
        return <Navigate to='/login' />;
    }

    if (user.roles.includes('Admin')) {
        return <Navigate to='/admin/users' />;
    }

    if (user.roles.includes('User')) {
        return <Navigate to={'/me'} />;
    }

    return <Navigate to='/login' />;
};

export default DynamicRoute;
