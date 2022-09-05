import React from 'react';
import { Button, Form, Row, Space, Spin } from '@douyinfe/semi-ui';
import { Link } from 'react-router-dom';
import ErrorMessage from '@douyinfe/semi-ui/lib/es/form/errorMessage';
import './styles.scss';
import ConfirmationPasswordForm from '~/components/ConfirmPasswordForm';
import _ from 'lodash';
import { useRegister } from '~/features/user/hooks';
import { catchUserActionError, fetchedUser } from '~/features/user';
import { useDispatch } from 'react-redux';

export default function Signup() {
    const dispatch = useDispatch();

    const { isLoading, error, mutate: register, data: user } = useRegister();

    const onSubmit = (values: Record<string, any>) => {
        const { email, password, first_name, last_name } = values;
        register(
            { email, password, name: `${first_name} ${last_name}` },
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
            {!!user && (
                <div className='response-wrapper'>
                    <div className='response-text'>Thank you for registration</div>
                </div>
            )}
            {!user && (
                <Form onSubmit={onSubmit}>
                    {({ values }) => (
                        <>
                            {!!error && <ErrorMessage error='Something went wrong' />}

                            <Form.Input field='first_name' label='First name' style={{ width: '100%' }} placeholder='Enter your first name' trigger='blur' />
                            <Form.Input field='last_name' label='Last name' style={{ width: '100%' }} placeholder='Enter your last name' trigger='blur' />
                            <Form.Input
                                field='email'
                                label='Email'
                                style={{ width: '100%' }}
                                placeholder='Enter your email'
                                trigger='blur'
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'Email is not valid'
                                    }
                                ]}
                            />
                            <ConfirmationPasswordForm
                                labelPassword='Password'
                                labelConfirmPassword='Confirm password'
                                placeholderPassword='Enter your password'
                                placeholderConfirmPassword='Enter your password again'
                                noMatchingText='Password does not match'
                            />
                            <Form.Checkbox field='agree' noLabel rules={[{ required: true }]}>
                                I have read and agree to the terms of service
                            </Form.Checkbox>
                            <Row type='flex' justify='space-between' align='middle'>
                                <Space align='center' spacing={4}>
                                    <span>Already have an account?</span>
                                    <Link className='signin-btn' to='/login'>
                                        Login
                                    </Link>
                                </Space>
                                <Button
                                    disabled={
                                        !values.agree ||
                                        _.isEmpty(values.first_name) ||
                                        _.isEmpty(values.last_name) ||
                                        _.isEmpty(values.email) ||
                                        _.isEmpty(values.password) ||
                                        _.isEmpty(values.confirmPassword) ||
                                        values.password !== values.confirmPassword
                                    }
                                    htmlType='submit'
                                    type='primary'
                                    theme='solid'>
                                    Create account
                                </Button>
                            </Row>
                        </>
                    )}
                </Form>
            )}
        </Spin>
    );
}
