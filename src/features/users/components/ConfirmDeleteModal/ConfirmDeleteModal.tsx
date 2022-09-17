import React, { useState } from 'react';
import { Modal, Spin, Typography } from '@douyinfe/semi-ui';
import { User } from '~/models';
import { useDeleteUser } from '../../hooks';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

type Props = {
    user: User;
};

export default function ConfirmDeleteModal({ user, onHide: hide, visible }) {
    const userId = user.id.toString();
    const navigate = useNavigate();

    const [errMsg, setErrMsg] = useState('');

    const { mutate: deleteUser, isLoading, error } = useDeleteUser(userId);

    const handleOk = () => {
        deleteUser(userId, {
            onSuccess: () => {
                hide();
                navigate('/admin/users');
            },
            onError: () => {
                setErrMsg(error.message);
            }
        });
    };

    const handleCancel = () => {
        hide();
    };

    return (
        <Modal title='Delete user' visible={visible} onOk={handleOk} onCancel={handleCancel} okText={'Delete'} cancelText={'Cancel'}>
            <Spin spinning={isLoading} style={{ width: '100%' }}>
                {!!errMsg && <Text type={'danger'}>{errMsg}</Text>}
                <Text>Delete user {User.getFullName(user)}?</Text>
            </Spin>
        </Modal>
    );
}
