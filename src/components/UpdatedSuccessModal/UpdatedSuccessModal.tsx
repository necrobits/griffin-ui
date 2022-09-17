import React from 'react';
import { Button, Modal, Typography } from '@douyinfe/semi-ui';

const { Text } = Typography;

export default function UpdatedSuccessModal({ visible, onClose: close }) {
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
            footer={
                <Button type={'tertiary'} onClick={handleOk}>
                    Close
                </Button>
            }>
            <Text>Updated successful, your changes have been saved.</Text>
        </Modal>
    );
}
