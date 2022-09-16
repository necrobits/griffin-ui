import { Form, Modal, Spin } from '@douyinfe/semi-ui';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';
import React, { useEffect, useState } from 'react';
import { useChangePassword } from '../../hooks/useChangePassword';
import SuccessUpdatedModal from '../SuccessUpdatedModal/SuccessUpdatedModal';

export default function ChangePassword({ visible, setVisible, userId }) {
    const [formValues, setFormValues] = useState({
        oldPwd: '',
        newPwd: '',
        confirmNewPwd: ''
    });
    const { mutate: changePassword, isLoading, error, isSuccess } = useChangePassword(`${userId}`);
    const [updatedVisible, setUpdatedVisible] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        if (isSuccess && !updatedVisible) {
            setVisible(false);
        }
    }, [updatedVisible]);

    const handleOk = () => {
        const { oldPwd, newPwd, confirmNewPwd } = formValues;
        if (newPwd !== confirmNewPwd) {
            setErrMsg('Confirm new password does not match new password');
            return;
        }

        changePassword(
            { userId, oldPwd, newPwd },
            {
                onSuccess: () => {
                    setUpdatedVisible(true);
                },
                onError: err => {
                    setErrMsg(err.message);
                }
            }
        );
    };
    const handleCancel = () => {
        setVisible(false);
    };

    const handleForm = values => {
        setErrMsg('');
        setFormValues(values);
    };

    return (
        <Modal title='Change password' visible={visible} onOk={handleOk} onCancel={handleCancel} okText={'Change password'} cancelText={'Cancel'}>
            <Spin spinning={isLoading} style={{ width: '100%' }}>
                <Text type={'danger'}>{errMsg}</Text>
                <Form labelPosition='left' labelWidth={200} onValueChange={handleForm}>
                    <Form.Input type={'password'} field='oldPwd' label={'Old password'} />
                    <Form.Input type={'password'} field='newPwd' label={'New password'} />
                    <Form.Input type={'password'} field='confirmNewPwd' label={'Confirm new password'} />
                </Form>
                <SuccessUpdatedModal visible={updatedVisible} setVisible={setUpdatedVisible} />
            </Spin>
        </Modal>
    );
}
