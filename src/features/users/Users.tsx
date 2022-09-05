import React from 'react';
import { List } from '@douyinfe/semi-ui';
import UserItem from '~/features/users/UserItem';
import { getResultsFromInfiniteFetch } from '~/hooks';
import { useFetchUsersInfinite } from '~/features/users/hooks';

export default function Users() {
    const { fetching, error, data } = useFetchUsersInfinite();

    return (
        <div className='list-group'>
            <List loading={fetching} dataSource={data ? getResultsFromInfiniteFetch(data) : []} renderItem={item => <UserItem {...item} loading={fetching} />} />
        </div>
    );
}
