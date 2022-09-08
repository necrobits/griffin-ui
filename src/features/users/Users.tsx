import React, { useEffect, useState } from 'react';
import { Avatar, Button, Dropdown, Empty, Skeleton, Table, Typography } from '@douyinfe/semi-ui';
import { getResultsFromInfiniteFetch } from '~/hooks';
import { useFetchUsersInfinite } from '~/features/users/hooks';
import { IllustrationNoResult, IllustrationNoResultDark } from '@douyinfe/semi-illustrations';
import { IconDelete, IconMore } from '@douyinfe/semi-icons';
import { User } from '~/models';
import './Users.scss';
import { useNavigate } from 'react-router-dom';
import { TimeManager } from '~/utils';
import useDeleteUser from './hooks/useDeleteUser';
import { DEFAULT_PAGINATION_PAGE_SIZE } from '~/constants';

const { Text, Title } = Typography;

export default function Users() {
    const navigate = useNavigate();
    const { fetching, error, data } = useFetchUsersInfinite();
    const { mutate: deleteUser, isLoading } = useDeleteUser();
    const dataSource = data ? getResultsFromInfiniteFetch(data) : [];
    const [isTableLoading, setIsTableLoading] = useState(true);

    useEffect(() => {
        setIsTableLoading(isLoading || fetching);
    }, [isLoading, fetching]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a: User, b: User) => User.getFullName(a).localeCompare(User.getFullName(b)),
            width: 200,
            render: (text, record: User, index) => {
                return (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar size='small' src={record.avatar} style={{ marginRight: 12 }}></Avatar>
                        {/* The width calculation method is the cell setting width minus the non-text content width */}
                        <Text ellipsis={{ showTooltip: true }} style={{ width: 'calc(200px - 76px)' }}>
                            {User.getFullName(record)}
                        </Text>
                    </div>
                );
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: 350,
            sorter: (a: User, b: User) => a.email.localeCompare(b.email)
        },
        {
            title: 'Phone number',
            dataIndex: 'phone',
            width: 200
        },
        {
            title: 'Roles',
            dataIndex: 'roles',
            width: 150,
            render: (text, record: User, index) => {
                const rolesTxt = record.roles.join(' | ');
                return rolesTxt;
            }
        },
        {
            title: 'Last active on',
            dataIndex: 'lastOnline',
            width: 300,
            sorter: (a: User, b: User) => {
                const time_a = new Date(a.lastOnline);
                const time_b = new Date(b.lastOnline);
                return time_a > time_b ? -1 : time_a == time_b ? 0 : 1;
            },
            render: (text, record, index) => TimeManager.formatFromISO(text, 'HH:mm dd.MM.yyyy')
        },
        {
            title: '',
            dataIndex: 'operate',
            render: (text, record: User) => {
                return (
                    <Dropdown
                        trigger='click'
                        position='bottomLeft'
                        render={
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => navigate(`/users/${record.id}`)}>
                                    <IconMore />
                                    Details
                                </Dropdown.Item>
                                <Dropdown.Item style={{ color: 'red' }} onClick={() => handleDelete(`${record.id}`)}>
                                    <IconDelete />
                                    Delete
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        }>
                        <Button icon={<IconMore />}></Button>
                    </Dropdown>
                );
            }
        }
    ];

    const handleDelete = (userId: string) => {
        deleteUser(userId);
    };

    const empty = <Empty image={<IllustrationNoResult />} darkModeImage={<IllustrationNoResultDark />} description={'No result'} />;

    const skData = {
        columns: ['a', 'b', 'c'].map(i => {
            const title = <Skeleton.Title style={{ width: '0' }} />;
            const dataIndex = `${i}`;
            return { title, dataIndex };
        }),
        dataSource: [1, 2, 3, 4].map(key => {
            const item: { [key: string]: any } = {};
            item.key = key;
            ['a', 'b', 'c'].forEach(i => {
                item[i] = <Skeleton.Paragraph style={{ width: 100 }} rows={1} />;
            });
            return item;
        })
    };

    const placeholder = (
        <div style={{ position: 'relative' }}>
            <Table style={{ backgroundColor: 'var(--semi-color-bg-1)' }} columns={skData.columns} dataSource={skData.dataSource} pagination={false} />
            <div style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}></div>
        </div>
    );

    return (
        <Skeleton placeholder={placeholder} loading={isTableLoading}>
            <Title style={{ marginBottom: '2rem' }}>Users</Title>

            <Table
                className='table-users'
                columns={columns}
                dataSource={dataSource}
                pagination={{
                    pageSize: DEFAULT_PAGINATION_PAGE_SIZE
                }}
                empty={empty}
            />
        </Skeleton>
    );
}
