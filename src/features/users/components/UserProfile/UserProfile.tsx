import { Button } from '@douyinfe/semi-ui';
import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { User } from '~/models';
import UserDetails from '../UserDetails';
import UserProfileForm from '../UserProfileForm';
import styles from './UserProfile.module.scss';

type Props = {
    user?: User;
};

export default function UserProfile({ user: propUser }: Props) {
    let user: User;
    if (propUser !== undefined) {
        user = propUser;
    } else {
        user = useOutletContext();
    }

    const [isEditMode, setIsEditMode] = useState(false);

    const handleEditButtonClicked = () => {
        setIsEditMode(prev => !prev);
    };

    return (
        <div className={styles.profileContainer}>
            <Button className={styles.editProfileBtn} type={'tertiary'} theme={'solid'} onClick={handleEditButtonClicked}>
                {isEditMode ? 'View profile' : 'Edit profile'}
            </Button>
            {isEditMode ? <UserProfileForm user={user} /> : <UserDetails user={user} />}
        </div>
    );
}
