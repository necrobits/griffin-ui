import React from 'react';
import { Login } from '~/features/user';
import './style.scss';
import AuthLayout from '~/layouts/AuthLayout';

export default function LoginPage() {
    return <AuthLayout title={'React'} hint='Sign in' body={<Login />} />;
}
