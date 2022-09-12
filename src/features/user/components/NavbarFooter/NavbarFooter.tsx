import React from 'react';
import { IconBell, IconEdit, IconHelpCircle, IconQuit, IconSetting } from '@douyinfe/semi-icons';
import { Avatar, Button, Dropdown, Spin } from '@douyinfe/semi-ui';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';
import { User } from '~/models';
import { useGetMe } from '../../../../hooks/queries/useGetMe';
import './NavbarFooter.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../user.action';

export default function NavbarFooter({ user }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
                className='dropdown'
                render={
                    <Dropdown.Menu className='dropdown-menu'>
                        <Dropdown.Item className='dropdown-item' onClick={() => navigate('/me')}>
                            <Avatar size='small' src={user.avatar ?? ''}>
                                {User.getShortName(user.firstName, user.lastName)}
                            </Avatar>
                            <Text strong={true}>{User.getFullName(user)}</Text>
                        </Dropdown.Item>
                        <Dropdown.Item className='dropdown-item'>
                            <IconSetting />
                            <Text>Settings</Text>
                        </Dropdown.Item>
                        <Dropdown.Item className='dropdown-item' onClick={handleSignout}>
                            <IconQuit style={{ color: 'red' }} />
                            <Text type='danger'>Sign out</Text>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                }>
                <Avatar className='avatar' size='small' src={user.avatar ?? ''}>
                    {User.getShortName(user.firstName, user.lastName)}
                </Avatar>
            </Dropdown>
        </>
    );
}
