import React from 'react';
import { Button, Form, Space, Spin } from '@douyinfe/semi-ui';
import { Link } from 'react-router-dom';
import ErrorMessage from '@douyinfe/semi-ui/lib/es/form/errorMessage';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { catchUserActionError, fetchedUser, getUserError } from '~/features/user';
import { useLogin } from '../../hooks';

export default function Login() {
    const error = useSelector(getUserError);
    const dispatch = useDispatch();

    const { isLoading, mutate: login } = useLogin();
    const onSubmit = (values: Record<string, any>) => {
        const { email, password } = values;
        login(
            { email, password },
            {
                onSuccess: user => {
                    dispatch(fetchedUser(user));
                },
                onError: e => {
                    dispatch(catchUserActionError(e));
                }
            }
        );
    };
    return (
        <Spin spinning={isLoading} style={{ width: '100%' }}>
            <Form onSubmit={onSubmit} style={{ width: '100%' }} className='login-form'>
                {() => (
                    <>
                        {!!error && <ErrorMessage error={`${error.statusCode}: ${error.message}`} />}
                        <Form.Input
                            field='email'
                            label='Email'
                            style={{ width: '100%' }}
                            placeholder='Email'
                            trigger='blur'
                            rules={[
                                {
                                    required: true,
                                    message: 'Password is required'
                                },
                                {
                                    type: 'email',
                                    message: 'Email is not valid'
                                }
                            ]}
                        />
                        <Form.Input
                            field='password'
                            label='Password'
                            type='password'
                            style={{ width: '100%' }}
                            trigger='blur'
                            placeholder={'Password'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Password is required'
                                }
                            ]}
                        />
                        <div className='login-footer'>
                            <Button className='login-btn' htmlType='submit' theme='solid' type='primary' block>
                                Login
                            </Button>
                            <Space spacing={16} vertical align='start' style={{ width: '100%' }}>
                                <Link className='forgot-password' to='/reset-password'>
                                    Forgot your password?
                                </Link>
                                <Space spacing={8} align='start' className='signup-action'>
                                    <div className='no-account-text'>You don&apos;t have an account?</div>

                                    <Link className='signup-btn' to='/signup'>
                                        Signup
                                    </Link>
                                </Space>
                            </Space>
                        </div>
                    </>
                )}
            </Form>
        </Spin>
    );
}
