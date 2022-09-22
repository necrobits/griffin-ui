import React from 'react';
import { Card, Space } from '@douyinfe/semi-ui';
import logo from 'assets/images/logo.png';
import styles from './AuthLayout.module.scss';
import Logo from '~/components/Logo';
import Title from '@douyinfe/semi-ui/lib/es/typography/title';

type Props = {
    title: string;
    hint?: string;
    body?: React.ReactNode;
    footer?: React.ReactNode;
};

export default function AuthLayout({ title, hint, body, footer }: Props) {
    return (
        <div className={styles.layoutWrapper}>
            <Card shadows='always'>
                <Space vertical className={styles.headerWrapper} spacing={8}>
                    <Logo logoSize={180} />
                    <Title className={styles.title} heading={3}>
                        {title}
                    </Title>
                </Space>
                <div className={styles.body}>
                    <Space vertical className={styles.contentWrapper} spacing={8}>
                        {body}
                    </Space>
                </div>
                {footer && (
                    <div className={styles.footer}>
                        <Space>{footer}</Space>
                    </div>
                )}
            </Card>
        </div>
    );
}
