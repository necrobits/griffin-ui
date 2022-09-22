import React, { useState } from 'react';
import { Button, Form, Spin } from '@douyinfe/semi-ui';
import formStyles from '~/theme/scss/Forms/AuthForm.module.scss';
import ErrorMessage from '@douyinfe/semi-ui/lib/es/form/errorMessage';
import { useResetPassword } from '../../hooks/useResetPassword';
import _ from 'lodash';
import ConfirmationPasswordForm from '~/components/ConfirmPasswordForm';

export default function ResetPassword() {
    const { mutate: resetPwd, isLoading, error } = useResetPassword();

    const onSubmit = ({ password }) => {
        resetPwd(password, {
            onSuccess: () => {
                console.log('Success');
            }
        });
    };

    return (
        <Spin spinning={isLoading} style={{ width: '100%' }}>
            {!isLoading && (
                <Form onSubmit={onSubmit} className={formStyles.form}>
                    {({ values }) => (
                        <>
                            {!!error && <ErrorMessage error={error.message} />}
                            <ConfirmationPasswordForm
                                labelPassword='Password'
                                labelConfirmPassword='Confirm password'
                                placeholderPassword='Enter your password'
                                placeholderConfirmPassword='Enter your password again'
                                noMatchingText='Password does not match'
                            />
                            <Button
                                className={formStyles.formBtn}
                                htmlType='submit'
                                type='primary'
                                theme='solid'
                                disabled={_.isEmpty(values.password) || _.isEmpty(values.confirmPassword) || values.password !== values.confirmPassword}>
                                Reset password
                            </Button>
                        </>
                    )}
                </Form>
            )}
        </Spin>
    );
}
