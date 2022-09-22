import React from 'react';
import { Button, Modal, Typography } from '@douyinfe/semi-ui';

const { Text } = Typography;

export default function NotificationModal({ text, visible, onClose: close }) {
    const handleOk = () => {
        close();
    };
    const handleCancel = () => {
        close();
    };
    return (
        <Modal
            title='Successful'
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={'fit-content'}
            footer={
                <Button type={'tertiary'} onClick={handleOk}>
                    Close
                </Button>
            }>
            <Text>{text}</Text>
        </Modal>
    );
}
