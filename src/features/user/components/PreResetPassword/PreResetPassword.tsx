import React, { useState } from 'react';
import { Button, Form, Spin } from '@douyinfe/semi-ui';
import { usePreResetpassword } from '../../hooks/usePreResetpassword';
import formStyles from '~/theme/scss/Forms/AuthForm.module.scss';
import ErrorMessage from '@douyinfe/semi-ui/lib/es/form/errorMessage';
import NotificationModal from '~/components/NotificationModal';

export default function PreResetPassword() {
    const { mutate: resetPwd, isLoading, error } = usePreResetpassword();

    const [visible, setVisible] = useState(false);

    const onSubmit = ({ email }) => {
        resetPwd(email, {
            onSuccess: () => {
                setVisible(true);
            }
        });
    };

    const onClose = () => {
        setVisible(false);
    };

    return (
        <Spin spinning={isLoading} style={{ width: '100%' }}>
            {!isLoading && (
                <>
                    <Form onSubmit={onSubmit} className={formStyles.form}>
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
                        />
                        <Button className={formStyles.formBtn} htmlType='submit' type='primary' theme='solid'>
                            Send reset link
                        </Button>
                    </Form>
                    <NotificationModal text={'A link to reset password has been sent to your email!'} visible={visible} onClose={onClose} />
                </>
            )}
        </Spin>
    );
}
