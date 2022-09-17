import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../user.action';
import { getCurrentUser } from '../../user.selector';
import { useFetchUser } from '~/features/users/hooks';
import { User } from '~/models';
import { IconBell, IconHelpCircle, IconQuit } from '@douyinfe/semi-icons';
import { Avatar, Button, Dropdown, Spin } from '@douyinfe/semi-ui';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';
import styles from './NavbarFooter.module.scss';

export default function NavbarFooter() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUser);
    const { data: user, isLoading } = useFetchUser(`${currentUser.id}`);

    const handleSignout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <>
            <Button
                theme='borderless'
                icon={<IconBell size='large' />}
                style={{
                    color: 'var(--semi-color-text-2)',
                    marginRight: '12px'
                }}
            />
            <Button
                theme='borderless'
                icon={<IconHelpCircle size='large' />}
                style={{
                    color: 'var(--semi-color-text-2)',
                    marginRight: '12px'
                }}
            />
            <Dropdown
                trigger='click'
                position='bottomRight'
                className={styles.dropdown}
                render={
                    <Dropdown.Menu className={styles.dropdownMenu}>
                        {isLoading ? (
                            <Dropdown.Item className={styles.dropdownItem}>
                                <Spin spinning={true} />
                            </Dropdown.Item>
                        ) : (
                            <>
                                <Dropdown.Item className={styles.dropdownItem} onClick={() => navigate(`/${user.id}`)}>
                                    <Avatar size='small' src={user.avatar ?? ''}>
                                        {User.getShortName(user.firstName, user.lastName)}
                                    </Avatar>
                                    <Text strong={true}>{User.getFullName(user)}</Text>
                                </Dropdown.Item>
                                <Dropdown.Item className={styles.dropdownItem} onClick={handleSignout}>
                                    <IconQuit style={{ color: 'red' }} />
                                    <Text type='danger'>Sign out</Text>
                                </Dropdown.Item>
                            </>
                        )}
                    </Dropdown.Menu>
                }>
                {isLoading ? (
                    <Avatar className={styles.avatar} size='small' />
                ) : (
                    <Avatar className={styles.avatar} size='small' src={user.avatar ?? ''}>
                        {User.getShortName(user.firstName, user.lastName)}
                    </Avatar>
                )}
            </Dropdown>
        </>
    );
}
