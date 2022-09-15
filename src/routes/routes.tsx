import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// layouts
import AdminLayout from '~/layouts/AdminLayout';
import UserLayout from '~/layouts/UserLayout';

// route
import ProtectedRoute from '~/routes/ProtectedRoute';
import DynamicRoute from './DynamicRoute';
import PersistLogin from './PersistLogin';

// modules
const Users = lazy(() => import('~/views/Users'));
const Login = lazy(() => import('~/views/Login'));
const Signup = lazy(() => import('~/views/Signup'));
const Example = lazy(() => import('~/views/Example'));
const AccountPage = lazy(() => import('~/views/AccountPage'));
const ProfilePage = lazy(() => import('~/views/ProfilePage'));
const AppsPage = lazy(() => import('~/views/ApplicationsPage'));
const UserSettingsPage = lazy(() => import('~/views/UserSettingsPage'));

export type IRoute = {
    exact?: boolean;
    path?: string;
    guard?: any;
    component?: any;
    requiredRoles?: string[];
    props?: any;
    propsGuard?: any;
    routes?: IRoute[];
};

export const routes: IRoute[] = [
    {
        exact: true,
        component: DynamicRoute
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'redirect',
        component: PersistLogin
    },
    {
        path: 'signup',
        component: Signup
    },
    {
        path: 'example',
        component: Example
    },
    {
        path: 'admin',
        guard: ProtectedRoute,
        component: AdminLayout,
        requiredRoles: ['Admin'],
        routes: [
            {
                path: 'users',
                component: Users
            },
            {
                path: 'users/:userId',
                component: UserSettingsPage
            }
        ]
    },
    {
        path: 'me',
        guard: ProtectedRoute,
        component: UserLayout,
        routes: [
            {
                exact: true,
                component: ProfilePage
            },
            {
                path: 'settings/account',
                component: AccountPage
            },
            {
                path: 'settings/applications',
                component: AppsPage
            }
        ]
    },
    {
        path: '*/*',
        component: () => <Navigate to='example' />
    }
];
