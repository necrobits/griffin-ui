import { List, Skeleton, Avatar, Tag } from '@douyinfe/semi-ui';
import Title from '@douyinfe/semi-ui/lib/es/typography/title';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDevLoading } from '~/hooks';
import { User } from '~/models';
import { useFetchUsers } from '../../../users/hooks/useFetchUsers';
import './SearchedUsers.scss';

type Props = {
    input: string;
    setSearched: React.Dispatch<React.SetStateAction<boolean>>;
    isSearching: boolean;
    searched: boolean;
};

export default function SearchedUsers({ searched, input, isSearching, setSearched }: Props) {
    if (!isSearching && !searched) return <></>;

    const navigate = useNavigate();
    const { data, isLoading, isSuccess } = useFetchUsers({ pageSize: 5, name: input });

    if (isSuccess) {
        setSearched(true);
    }

    const handleItemClicked = userId => {
        navigate(`/admin/users/${userId}`);
    };

    const placeholder = (
        <div className='placeholder'>
            <div className='placeholder-item'>
                <Skeleton.Avatar size='small' style={{ marginRight: 12 }} />
                <Skeleton.Title style={{ width: 200 }} />
            </div>
            <div className='placeholder-item'>
                <Skeleton.Avatar size='small' style={{ marginRight: 12 }} />
                <Skeleton.Title style={{ width: 200 }} />
            </div>
        </div>
    );

    return (
        <Skeleton placeholder={placeholder} loading={isLoading}>
            <List
                className='list'
                dataSource={!isLoading ? data.results : []}
                renderItem={item => (
                    <List.Item onClick={() => handleItemClicked(item.id)} className='list-item'>
                        <div className='list-item-left'>
                            <Avatar size={'extra-extra-small'} color='lime' src={item.avatar}>
                                {User.getShortName(item.firstName, item.lastName)}
                            </Avatar>
                            <Title heading={6}>{User.getFullName(item)}</Title>
                        </div>
                        <Tag key={item.roles[0]} color={item.roles[0] === 'Admin' ? 'red' : 'green'}>
                            {item.roles[0]}
                        </Tag>
                    </List.Item>
                )}
            />
        </Skeleton>
    );
}
