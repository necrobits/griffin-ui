import { IconSearch } from '@douyinfe/semi-icons';
import React from 'react';
import { Search, SearchDropdown, SearchedUsers } from '~/features/search/components';
import UserAccount from '~/features/users/components/UserAccount';
import UserApps from '~/features/users/components/UserApps';
import UserDetails from '~/features/users/components/UserDetails';

export default function UserSettingsPage() {
    const portalComponents = [
        {
            name: 'Users',
            component: SearchedUsers
        }
    ];

    return (
        <>
            <SearchDropdown components={portalComponents} />
            <UserDetails />
            <UserAccount />
            <UserApps />
        </>
    );
}
