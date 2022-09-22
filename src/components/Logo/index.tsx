import React from 'react';
import LogoImage from 'assets/images/logo.png';

type Props = {
    src?: string;
    logoSize?: number;
};

export default function Logo({ logoSize = 128, src = LogoImage }: Props) {
    return <img src={src} width={logoSize} />;
}
