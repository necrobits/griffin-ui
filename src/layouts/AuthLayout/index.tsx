import React from 'react';
import { Card, Space } from '@douyinfe/semi-ui';
import Logo from '~/components/Logo';
import './style.scss';

type Props = {
    title: string;
    hint: string;
    body?: React.ReactNode;
    footer?: React.ReactNode;
};

export default function AuthLayout({ title, hint, body, footer }: Props) {
    return (
        <div className='auth-layout-wrapper'>
            <Card shadow-='always'>
                <Space vertical className='header-wrapper' spacing={8}>
                    <Logo className='logo' logoSize={88} />
                    <div className='title'>{title}</div>
                    <div className='hint'>{hint}</div>
                </Space>

                <div className='body'>
                    <Space vertical className='content-wrapper' spacing={8}>
                        {body}
                    </Space>
                </div>
                {footer && (
                    <div className='footer'>
                        <Space className='action-wrapper'>{footer}</Space>
                    </div>
                )}
            </Card>
        </div>
    );
}
