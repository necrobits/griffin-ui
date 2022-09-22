import React from 'react';
import ResetPassword from '~/features/user/components/ResetPassword';
import AuthLayout from '~/layouts/AuthLayout';

export default function ResetPasswordPage() {
    return <AuthLayout title='Reset password' body={<ResetPassword />} />;
}
