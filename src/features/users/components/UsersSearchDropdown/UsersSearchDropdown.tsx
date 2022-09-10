import { List, Skeleton, Avatar, Tag } from '@douyinfe/semi-ui';
import Title from '@douyinfe/semi-ui/lib/es/typography/title';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDevLoading } from '~/hooks';
import { User } from '~/models';
import { useFetchUsers } from '../../hooks/useFetchUsers';
import './UsersSearchDropdown.scss';

export default function UsersSearchDropdown({ input }) {
    if (input === '') return <></>;
    const navigate = useNavigate();
    const { data, isLoading } = useFetchUsers({ pageSize: 5, name: input });
    const devLoading = useDevLoading();

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

    const handleItemClicked = userId => {
        console.log('Clicked');
        navigate(`/users/${userId}`);
    };

    return (
        <Skeleton placeholder={placeholder} loading={devLoading}>
            <List
                className='list'
                dataSource={!isLoading ? data.results : []}
                renderItem={item => (
                    <List.Item onClick={() => handleItemClicked(item.id)} className='list-item'>
                        <div className='list-item-left'>
                            <Avatar size='small' color='lime' src={item.avatar}>
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
