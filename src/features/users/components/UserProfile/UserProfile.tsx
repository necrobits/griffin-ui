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
    let user: User = useOutletContext();
    if (propUser) {
        user = propUser;
    }

    const [isEditMode, setIsEditMode] = useState(false);

    const handleEditButtonClicked = () => {
        setIsEditMode(prev => !prev);
    };

    const onSubmitted = () => {
        setIsEditMode(false);
    };

    return (
        <div className={styles.profileContainer}>
            <Button className={styles.editProfileBtn} type={'tertiary'} theme={'solid'} onClick={handleEditButtonClicked}>
                {isEditMode ? 'View profile' : 'Edit profile'}
            </Button>
            {isEditMode ? <UserProfileForm user={user} onSubmitted={onSubmitted} /> : <UserDetails user={user} />}
        </div>
    );
}
