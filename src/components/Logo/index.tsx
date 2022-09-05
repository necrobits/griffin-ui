import React from 'react';
import LogoImage from 'assets/images/logo.svg';
import { Avatar } from '@douyinfe/semi-ui';
import { AvatarProps } from '@douyinfe/semi-ui/avatar/interface';

type Props = {
    src?: string;
    logoSize?: number;
    label?: string;
} & AvatarProps;
export default function Logo({ logoSize = 128, src = LogoImage, label, ...others }: Props) {
    return (
        <Avatar src={src} {...others} style={{ width: logoSize, height: logoSize, border: '1px solid #ddd' }}>
            {label}
        </Avatar>
    );
}
