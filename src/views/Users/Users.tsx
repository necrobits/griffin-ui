import React from 'react';
import SearchDropdown from '~/components/SearchDropdown';
import { SearchedUsers } from '~/features/search/components';
import Users from '~/features/users';

export default function UsersPage() {
    const portalComponents = [
        {
            name: 'Users',
            component: SearchedUsers
        }
    ];

    return (
        <>
            <SearchDropdown components={portalComponents} />
            <Users />
        </>
    );
}
