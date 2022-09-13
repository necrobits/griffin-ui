import React from 'react';
import { List, Skeleton, Avatar, Tag } from '@douyinfe/semi-ui';
import Title from '@douyinfe/semi-ui/lib/es/typography/title';
import { useNavigate } from 'react-router-dom';
import { User } from '~/models';
import { useFetchUsers } from '../../../users/hooks/useFetchUsers';
import styles from './SearchedUsers.module.scss';
import { useDispatch } from 'react-redux';
import { clearInput } from '../../search.action';

type Props = {
    input: string;
};

export default function SearchedUsers({ input }: Props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data, isLoading } = useFetchUsers({ pageSize: 5, name: input });

    const handleItemClicked = userId => {
        dispatch(clearInput());
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
            <div className='preventMouseDown' onMouseDown={e => e.preventDefault()}>
                <List
                    className={styles.list}
                    dataSource={!isLoading ? data.results : []}
                    renderItem={item => (
                        <List.Item onClick={() => handleItemClicked(item.id)} className={styles.listITem}>
                            <div className={styles.left}>
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
            </div>
        </Skeleton>
    );
}
