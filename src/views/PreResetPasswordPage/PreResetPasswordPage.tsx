import React from 'react';
import AuthLayout from '~/layouts/AuthLayout';
import PreResetPassword from '~/features/user/components/PreResetPassword/PreResetPassword';

export default function PreResetPasswordPage() {
    return <AuthLayout title={'Reset password'} body={<PreResetPassword />} />;
}
