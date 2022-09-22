import React from 'react';
import { Button, Col, Form, Row, Space, Spin } from '@douyinfe/semi-ui';
import { Link } from 'react-router-dom';
import ErrorMessage from '@douyinfe/semi-ui/lib/es/form/errorMessage';
import '../Signup/styles.scss';
import ConfirmationPasswordForm from '~/components/ConfirmPasswordForm';
import _ from 'lodash';
import { usePreRegister } from '../../hooks/usePreRegister';
import formStyles from '~/theme/scss/Forms/AuthForm.module.scss';

export default function SignUpAccount({ preValues, onNext: next }) {
    const { isLoading, error, mutate: preRegister } = usePreRegister();

    const onSubmit = (formValues: Record<string, any>) => {
        const { email, password } = formValues;
        preRegister(email, {
            onSuccess: () => {
                next({ email, password });
            },
            onError: e => {
                console.log('Error', e);
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
                            <Form.Input
                                field='email'
                                label='Email'
                                placeholder='Enter your email'
                                trigger='blur'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Email is required.'
                                    },
                                    {
                                        type: 'email',
                                        message: 'Email is not valid'
                                    }
                                ]}
                                initValue={preValues?.email}
                            />
                            <ConfirmationPasswordForm
                                labelPassword='Password'
                                labelConfirmPassword='Confirm password'
                                placeholderPassword='Enter your password'
                                placeholderConfirmPassword='Enter your password again'
                                noMatchingText='Password does not match'
                            />

                            <Row type='flex' justify={'space-between'} align='middle'>
                                <Col>
                                    <Space align='center' spacing={4}>
                                        <span>Already have an account?</span>
                                        <Link className={formStyles.formLinkBtn} to='/login'>
                                            Login
                                        </Link>
                                    </Space>
                                </Col>
                                <Col>
                                    <Button
                                        className={formStyles.formBtn}
                                        disabled={
                                            _.isEmpty(values.email) || _.isEmpty(values.password) || _.isEmpty(values.confirmPassword) || values.password !== values.confirmPassword
                                        }
                                        htmlType='submit'
                                        type='primary'
                                        theme='solid'>
                                        Next
                                    </Button>
                                </Col>
                            </Row>
                        </>
                    )}
                </Form>
            )}
        </Spin>
    );
}
