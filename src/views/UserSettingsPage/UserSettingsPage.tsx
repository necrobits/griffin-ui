import React from 'react';
import { SearchDropdown, SearchedUsers } from '~/features/search/components';
import UserSettings from '~/features/users/components/UserSettings';

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
            <UserSettings />
        </>
    );
}
