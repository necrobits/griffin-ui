import React from 'react';
import { User } from '~/models';

type Props = {
    user?: User;
};

export default function UserApps({ user: propUser }: Props) {
    return <div>UserApps</div>;
}
