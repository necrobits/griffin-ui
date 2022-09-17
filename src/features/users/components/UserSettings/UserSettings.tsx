import React, { useState } from 'react';
import { Button, Collapse, Spin } from '@douyinfe/semi-ui';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchUser } from '../../hooks';
import UserAccount from '../UserAccount';
import UserApps from '../UserApps';
import UserProfile from '../UserProfile';
import styles from './UserSettings.module.scss';
import { IconDelete } from '@douyinfe/semi-icons';
import ConfirmDeleteModal from '../ConfirmDeleteModal';

export default function UserSettings() {
    const { userId } = useParams();

    const { isLoading, data: user } = useFetchUser(userId);

    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    const onHide = () => {
        setDeleteModalVisible(false);
    };
    const handleDelete = () => {
        setDeleteModalVisible(true);
    };

    return (
        <Spin spinning={isLoading} style={{ width: '100%' }}>
            <Collapse defaultActiveKey={'profile'} className={styles.userSettings}>
                {!isLoading && (
                    <>
                        <Collapse.Panel className={styles.collapsePanel} header='Profile' itemKey='profile'>
                            <UserProfile user={user} />
                        </Collapse.Panel>
                        <Collapse.Panel className={styles.collapsePanel} header='Account' itemKey='account'>
                            <Button type={'danger'} icon={<IconDelete />} onClick={handleDelete}>
                                Delete user
                            </Button>
                            <UserAccount user={user} />
                            <ConfirmDeleteModal user={user} onHide={onHide} visible={deleteModalVisible} />
                        </Collapse.Panel>
                        <Collapse.Panel className={styles.collapsePanel} header='Applications' itemKey='apps'>
                            <UserApps user={user} />
                        </Collapse.Panel>
                    </>
                )}
            </Collapse>
        </Spin>
    );
}
