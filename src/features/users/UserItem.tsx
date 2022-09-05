import React, { useEffect, useState } from 'react';
import { Avatar, Button, ButtonGroup, Descriptions, List, Skeleton, Typography } from '@douyinfe/semi-ui';

import { User } from '~/models/user';
import './Useritem.scss';
import { TimeManager } from '~/utils';

type Props = User & {
    loading: boolean;
};

function UserItem({ ...props }: Props) {
    const { Text } = Typography;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 500);
    }, []);

    const description = [
        {
            key: 'Email',
            value: <Text link={{ href: `mailto:${props.email}` }}>{props.email}</Text>
        }
    ];

    const placeholder = (
        <div className='placeholder'>
            <Skeleton.Avatar className='avatar' />
            <div>
                <Skeleton.Title className='title' />
                <Skeleton.Paragraph className='description' rows={2} />
            </div>
        </div>
    );
    return (
        <Skeleton className='skeleton' placeholder={placeholder} loading={loading}>
            <List.Item
                className='user'
                header={<Avatar src={props.avatar} />}
                main={
                    <div className='body'>
                        <div className='title-wrapper'>
                            <span className='name'>{User.getFullName(props)}</span>
                            <span className='date-time-wrapper'>
                                <span className='label'>created on</span>
                                <span className='date-time'>{TimeManager.formatFromISO(props.createdAt, ' HH:mm dd.MM.yyyy')}</span>
                            </span>
                        </div>
                        <div className='description-wrapper'>
                            <Descriptions align='left' data={description} />
                        </div>
                    </div>
                }
                extra={
                    <ButtonGroup theme='borderless'>
                        <Button>Edit</Button>
                        <Button type='danger'>X</Button>
                    </ButtonGroup>
                }
            />
        </Skeleton>
    );
}

export default UserItem;
