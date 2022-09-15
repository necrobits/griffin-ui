import { Form, Modal } from '@douyinfe/semi-ui';
import React from 'react';

export default function ChangePassword({ visible, setVisible }) {
    const handleOk = () => {
        setVisible(false);
    };
    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <Modal title='Change password' visible={visible} onOk={handleOk} onCancel={handleCancel} okText={'Change password'} cancelText={'Cancel'}>
            <Form labelPosition='left' labelWidth={200}>
                <Form.Input field='old_pwd' label={'Old password'} />
                <Form.Input field='new_pwd' label={'New password'} />
                <Form.Input field='confirm_new_pwd' label={'Confirm new password'} />
            </Form>
        </Modal>
    );
}
