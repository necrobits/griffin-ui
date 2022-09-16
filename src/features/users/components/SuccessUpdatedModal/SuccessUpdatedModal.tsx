import { Form, Modal } from '@douyinfe/semi-ui';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';
import React from 'react';

type Props = {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setIsEditMode?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SuccessUpdatedModal({ visible, setVisible, setIsEditMode }: Props) {
    const handleOk = () => {
        setVisible(false);
        if (setIsEditMode) {
            setIsEditMode(false);
        }
    };
    const handleCancel = () => {
        setVisible(false);
        if (setIsEditMode) {
            setIsEditMode(false);
        }
    };

    return (
        <Modal title='Updated successful' visible={visible} onOk={handleOk} onCancel={handleCancel} okText={'Ok'} cancelText={'Close'}>
            <Text>Updated successful</Text>
        </Modal>
    );
}
