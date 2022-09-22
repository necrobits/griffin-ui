import React, { useState } from 'react';
import { Button, Form, Row, Space, Spin } from '@douyinfe/semi-ui';
import { Link } from 'react-router-dom';
import ErrorMessage from '@douyinfe/semi-ui/lib/es/form/errorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { catchUserActionError, fetchedUser, getUserError } from '~/features/user';
import { useLogin } from '../../hooks';
import { Checkbox } from '@douyinfe/semi-ui/lib/es/checkbox';
import { LStorage } from '~/storage';
import { PERSIST } from '~/constants';
import formStyles from '~/theme/scss/Forms/AuthForm.module.scss';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';

export default function Login() {
    const dispatch = useDispatch();
    const [persist, setPersist] = useState(false);

    const error = useSelector(getUserError);
    const { isLoading, mutate: login } = useLogin();

    const onSubmit = (values: Record<string, any>) => {
        const { email, password } = values;
        login(
            { email, password },
            {
                onSuccess: user => {
                    LStorage.setItem(PERSIST, persist);
                    dispatch(fetchedUser(user));
                },
                onError: e => {
                    dispatch(catchUserActionError(e));
                }
            }
        );
    };

    const onKeepLogin = checked => {
        setPersist(checked.target.checked);
    };

    return (
        <Spin spinning={isLoading} style={{ width: '100%' }}>
            <Form onSubmit={onSubmit} style={{ width: '100%' }}>
                {!!error && <ErrorMessage error={`${error.statusCode}: ${error.message}`} />}
                <Form.Input
                    field='email'
                    label={{ text: 'Email' }}
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
                    trigger='blur'
                    placeholder='Password'
                    rules={[
                        {
                            required: true,
                            message: 'Password is required'
                        }
                    ]}
                />
                <Space spacing={8} align='start'>
                    <Text>Keep me logged in?</Text>
                    <Checkbox checked={persist} onChange={onKeepLogin} />
                </Space>
                <Button className={`${formStyles.formBtn}`} htmlType='submit' theme='solid' type='primary' block>
                    Login
                </Button>
                <Row>
                    <Space spacing={8} vertical align='start'>
                        <Link className={formStyles.formLink} to='/reset-password'>
                            Forgot your password?
                        </Link>
                        <Space spacing={8} align='start'>
                            <Text>You don&apos;t have an account?</Text>
                            <Link className={formStyles.formLinkBtn} to='/signup'>
                                Sign up
                            </Link>
                        </Space>
                    </Space>
                </Row>
            </Form>
        </Spin>
    );
}
