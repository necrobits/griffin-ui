import React from 'react';
import { Signup } from '~/features/user';
import './style.scss';
import AuthLayout from '~/layouts/AuthLayout';

export default function SignupPage() {
    return <AuthLayout title={'React'} hint='Create a new account' body={<Signup />} />;
}
