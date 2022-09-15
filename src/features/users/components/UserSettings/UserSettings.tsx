import { Collapse } from '@douyinfe/semi-ui';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchUser } from '../../hooks';
import UserAccount from '../UserAccount';
import UserApps from '../UserApps';
import UserDetails from '../UserDetails';
import UserProfile from '../UserProfile';
import styles from './UserSettings.module.scss';

export default function UserSettings() {
    const { userId } = useParams();

    const { isLoading, data: user, error } = useFetchUser(userId);

    return error ? (
        <p>{error}</p>
    ) : isLoading ? (
        <p>Loading...</p>
    ) : (
        <Collapse defaultActiveKey={'profile'} className={styles.userSettings}>
            <Collapse.Panel className={styles.collapsePanel} header='Profile' itemKey='profile'>
                <UserProfile user={user} />
            </Collapse.Panel>
            <Collapse.Panel className={styles.collapsePanel} header='Account' itemKey='account'>
                <UserAccount user={user} />
            </Collapse.Panel>
            <Collapse.Panel className={styles.collapsePanel} header='Applications' itemKey='apps'>
                <UserApps user={user} />
            </Collapse.Panel>
        </Collapse>
    );
}
