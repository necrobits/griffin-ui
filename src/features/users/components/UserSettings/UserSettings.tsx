import React from 'react';
import { Collapse, Spin } from '@douyinfe/semi-ui';
import { useParams } from 'react-router-dom';
import { useFetchUser } from '../../hooks';
import UserAccount from '../UserAccount';
import UserApps from '../UserApps';
import UserProfile from '../UserProfile';
import styles from './UserSettings.module.scss';

export default function UserSettings() {
    const { userId } = useParams();

    const { isLoading, data: user } = useFetchUser(userId);

    return (
        <Spin spinning={isLoading} style={{ width: '100%' }}>
            <Collapse defaultActiveKey={'profile'} className={styles.userSettings}>
                {!isLoading && (
                    <>
                        <Collapse.Panel className={styles.collapsePanel} header='Profile' itemKey='profile'>
                            <UserProfile user={user} />
                        </Collapse.Panel>
                        <Collapse.Panel className={styles.collapsePanel} header='Account' itemKey='account'>
                            <UserAccount user={user} />
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
