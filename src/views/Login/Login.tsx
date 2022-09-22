import React from 'react';
import { Login } from '~/features/user';
import AuthLayout from '~/layouts/AuthLayout';

export default function LoginPage() {
    return <AuthLayout title={'Sign in'} body={<Login />} />;
}
