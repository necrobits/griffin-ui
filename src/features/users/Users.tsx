import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Avatar, Button, Dropdown, Empty, Progress, Skeleton, Table, Tag, Typography } from '@douyinfe/semi-ui';
import { IllustrationNoResult, IllustrationNoResultDark } from '@douyinfe/semi-illustrations';
import { IconDelete, IconMore, IconUserGroup } from '@douyinfe/semi-icons';
import { User } from '~/models';
import styles from './Users.module.scss';
import { useNavigate } from 'react-router-dom';
import { TimeManager } from '~/utils';
import { useDispatch } from 'react-redux';
import { clearInput } from '../search';
import { useGetOnlineUsers, useFetchUsers } from './hooks';
import ConfirmDeleteModal from './components/ConfirmDeleteModal';

const { Text, Title } = Typography;

const PAGE_SIZE = 7;
const TABLE_PROPS = {
    name: {
        title: 'Name',
        dataIndex: 'name',
        width: 200
    },
    email: {
        title: 'Email',
        dataIndex: 'email',
        width: 300
    },
    username: {
        title: 'Username',
        dataIndex: 'username',
        width: 200
    },
    roles: {
        title: 'Roles',
        dataIndex: 'roles',
        width: 100
    },
    isActive: {
        title: 'Active',
        dataIndex: 'isActive',
        width: 100
    },
    lastOnline: {
        title: 'Last active on',
        dataIndex: 'lastOnline',
        width: 200
    },
    more: {
        title: '',
        dataIndex: 'operate'
    }
};

export default function Users() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [dataSource, setDataSource]: [User[], Dispatch<SetStateAction<User[]>>] = useState([]);
    const [isTableLoading, setIsTableLoading] = useState(true);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    const onlineUsers = useGetOnlineUsers();
    const { data, isLoading: isUsersLoading, refetch, isRefetching } = useFetchUsers({ pageSize: PAGE_SIZE, page: currentPage });

    useEffect(() => {
        return () => {
            dispatch(clearInput());
        };
    }, []);

    useEffect(() => {
        setIsTableLoading(isRefetching || isUsersLoading);
    }, [isRefetching, isUsersLoading]);

    useEffect(() => {
        if (!isUsersLoading) {
            setTotal(data.total);
            setDataSource(data ? data.results : []);
        }
    }, [data]);

    const handleDelete = () => {
        setDeleteModalVisible(true);
    };

    const handlePageChange = page => {
        setCurrentPage(page);
    };

    const getOnlinePercent = () => {
        const percent = (onlineUsers / total) * 100;
        return percent;
    };

    const onHide = () => {
        setDeleteModalVisible(false);
        refetch();
    };

    const columns = [
        {
            ...TABLE_PROPS.name,
            sorter: (a: User, b: User) => User.getFullName(a).localeCompare(User.getFullName(b)),
            render: (text, record: User, index) => {
                return (
                    <div className={styles.colNameRec}>
                        <Avatar size='small' color='lime' src={record.avatar} style={{ marginRight: 12 }}>
                            {User.getShortName(record.firstName, record.lastName)}
                        </Avatar>
                        <Text ellipsis={{ showTooltip: true }} style={{ width: `calc(${TABLE_PROPS.name.width}px - 76px)` }}>
                            {User.getFullName(record)}
                        </Text>
                    </div>
                );
            }
        },
        {
            ...TABLE_PROPS.email,
            sorter: (a: User, b: User) => a.email.localeCompare(b.email)
        },
        {
            ...TABLE_PROPS.username,
            sorter: (a: User, b: User) => a.username.localeCompare(b.username)
        },
        {
            ...TABLE_PROPS.roles,
            render: (text, record: User, index) => {
                const colors = {
                    Admin: 'red',
                    User: 'green'
                };
                const item = record.roles.map(role => (
                    <Tag key={role} color={colors[role]}>
                        {role}
                    </Tag>
                ));
                return item;
            }
        },
        {
            ...TABLE_PROPS.lastOnline,
            sorter: (a: User, b: User) => {
                const time_a = new Date(a.lastOnline);
                const time_b = new Date(b.lastOnline);
                return time_a > time_b ? -1 : time_a == time_b ? 0 : 1;
            },
            render: (text, record, index) => TimeManager.formatFromISO(text, 'HH:mm dd.MM.yyyy')
        },
        {
            ...TABLE_PROPS.isActive,
            render: (isActive, record, index) => {
                const item = (
                    <Tag key={isActive} color={isActive ? 'green' : 'grey'}>
                        {isActive ? 'online' : 'offline'}
                    </Tag>
                );
                return item;
            }
        },
        {
            ...TABLE_PROPS.more,
            render: (text, record: User) => {
                return (
                    <Dropdown
                        trigger='click'
                        position='bottomLeft'
                        render={
                            <>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => navigate(`/admin/users/${record.id}`)}>
                                        <IconMore />
                                        Details
                                    </Dropdown.Item>
                                    <Dropdown.Item style={{ color: 'red' }} onClick={handleDelete}>
                                        <IconDelete />
                                        Delete
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                                <ConfirmDeleteModal user={record} onHide={onHide} visible={deleteModalVisible} />
                            </>
                        }>
                        <Button icon={<IconMore />}></Button>
                    </Dropdown>
                );
            }
        }
    ];

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
            <div className={styles.header}>
                <div className={styles.headerText}>
                    <IconUserGroup className={styles.headerIcon} size='extra-large' />
                    <Title className={styles.headerTitle} heading={3}>
                        Users Management
                    </Title>
                </div>
                <div className={styles.asside}>
                    <Progress
                        percent={getOnlinePercent()}
                        width={90}
                        orbitStroke={'var(--semi-color-tertiary)'}
                        strokeWidth={5}
                        type='circle'
                        showInfo
                        format={per => (
                            <div className={styles.progressInfo}>
                                <Title heading={4}>{total}</Title>
                                <Text>Total users</Text>
                            </div>
                        )}
                        aria-label='active-users'
                    />
                    <ul className={styles.progressNotes}>
                        <li className={styles.active}>Active users: {onlineUsers}</li>
                        <li className={styles.inactive}>Inactive users: {total - onlineUsers}</li>
                    </ul>
                </div>
            </div>
            <Table
                className={styles.table}
                columns={columns}
                dataSource={dataSource}
                pagination={{
                    currentPage,
                    pageSize: PAGE_SIZE,
                    total,
                    onPageChange: handlePageChange
                }}
                empty={empty}
            />
        </Skeleton>
    );
}
