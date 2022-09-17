import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Spin } from '@douyinfe/semi-ui';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';
import _ from 'lodash';
import ConfirmationPasswordForm from '~/components/ConfirmPasswordForm';
import UpdatedSuccessModal from '~/components/UpdatedSuccessModal';
import { useChangePassword } from '../../hooks/useChangePassword';

export default function ChangePassword({ visible, userId, onClose: close }) {
    const [formValues, setFormValues] = useState({
        oldPwd: '',
        password: ''
    });
    const [successVisible, setSuccessVisible] = useState(false);
    const [changeBtnDisabled, setChangeBtnDisabled] = useState(true);

    const { mutate: changePassword, isLoading } = useChangePassword(`${userId}`);

    const [errMsg, setErrMsg] = useState('');

    const handleOk = () => {
        const { oldPwd, password } = formValues;

        changePassword(
            { userId, oldPwd, newPwd: password },
            {
                onSuccess: () => {
                    setSuccessVisible(true);
                },
                onError: err => {
                    setErrMsg(err.message);
                }
            }
        );
    };
    const handleCancel = () => {
        close();
    };

    const handleForm = values => {
        setErrMsg('');
        const isEmpty = _.isEmpty(values.oldPwd) || _.isEmpty(values.password) || _.isEmpty(values.confirmPassword);
        if (isEmpty) {
            setErrMsg('Fields should not be empty');
            setChangeBtnDisabled(true);
            return;
        }
        if (values.password !== values.confirmPassword) {
            setErrMsg('Confirm new password does not match');
            setChangeBtnDisabled(true);
            return;
        }
        const { oldPwd, password } = values;
        setFormValues({ oldPwd, password });
        setChangeBtnDisabled(false);
    };

    const handleSuccessClosed = () => {
        setSuccessVisible(false);
        close();
    };

    return (
        <Modal
            title='Change password'
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={'Change password'}
            cancelText={'Cancel'}
            footer={
                <>
                    <Button type={'tertiary'} onClick={handleCancel}>
                        Close
                    </Button>
                    <Button type={'primary'} onClick={handleOk} disabled={changeBtnDisabled}>
                        Change password
                    </Button>
                </>
            }>
            <Spin spinning={isLoading} style={{ width: '100%' }}>
                <Text type={'danger'}>{errMsg}</Text>
                <Form labelPosition='left' labelWidth={200} onValueChange={handleForm}>
                    <Form.Input type={'password'} field='oldPwd' label={'Old password'} />
                    <ConfirmationPasswordForm labelPassword='New password' labelConfirmPassword='Confirm new password' />
                </Form>
                <UpdatedSuccessModal visible={successVisible} onClose={handleSuccessClosed} />
            </Spin>
        </Modal>
    );
}
