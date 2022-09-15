import React from 'react';
import { Typography, Avatar, Divider, Tag, Button } from '@douyinfe/semi-ui';
import { useOutletContext } from 'react-router-dom';
import { User } from '~/models';
import { TimeManager } from '~/utils';
import styles from './UserDetails.module.scss';

const { Title, Text } = Typography;

type Props = {
    user: User;
};

export default function UserDetails({ user }: Props) {
    return (
        <div className={styles.content}>
            <div className={styles.contentHeader}>
                <Avatar className={styles.avatar} src={user.avatar}>
                    {user.avatar ? '' : User.getShortName(user.firstName, user.lastName)}
                </Avatar>
                <div className={styles.nameGroup}>
                    <Title heading={1}>{User.getFullName(user)}</Title>
                    <Text type={'quaternary'}>Joined since {TimeManager.formatFromISO(user.createdAt, 'MMMM dd, yyyy')}</Text>
                </div>
                {user.roles.map(role => (
                    <Tag key={user.id} type={'solid'}>
                        {role}
                    </Tag>
                ))}
            </div>
            <div className={styles.contentBody}>
                <Divider margin={'1rem'} align={'left'}>
                    Basic information
                </Divider>
                <div className={styles.section}>
                    <div className={styles.item}>
                        <Title heading={6} className={styles.title}>
                            First name
                        </Title>
                        <Text>{user.firstName}</Text>
                    </div>
                    <div className={styles.item}>
                        <Title heading={6} className={styles.title}>
                            Last name
                        </Title>
                        <Text>{user.lastName}</Text>
                    </div>
                    <div className={styles.item}>
                        <Title heading={6} className={styles.title}>
                            Gender
                        </Title>
                        <Text>{user.gender}</Text>
                    </div>
                    <div className={styles.item}>
                        <Title heading={6} className={styles.title}>
                            Date of birth
                        </Title>
                        <Text>{TimeManager.formatFromDate(TimeManager.startOfDateFromStr(user.birthDate), 'MMMM dd, yyyy')}</Text>
                    </div>
                    <div className={styles.item}>
                        <Title heading={6} className={styles.title}>
                            Nation
                        </Title>
                        <Text>{user.nationality}</Text>
                    </div>
                </div>
                <Divider margin={'1rem'} align={'left'}>
                    Contact
                </Divider>
                <div className={styles.section}>
                    <div className={styles.item}>
                        <Title heading={6} className={styles.title}>
                            Email
                        </Title>
                        <Text>{user.email}</Text>
                    </div>
                    <div className={styles.item}>
                        <Title heading={6} className={styles.title}>
                            Phone number
                        </Title>
                        <Text>{user.phoneNumber}</Text>
                    </div>
                </div>
                <Divider margin={'1rem'} align={'left'}>
                    Address
                </Divider>
                <div className={styles.section}>
                    <div className={styles.item}>
                        <Title heading={6} className={styles.title}>
                            Street
                        </Title>
                        <Text>{user.address.street}</Text>
                    </div>
                    <div className={styles.item}>
                        <Title heading={6} className={styles.title}>
                            Postal code
                        </Title>
                        <Text>{user.address.post}</Text>
                    </div>
                    <div className={styles.item}>
                        <Title heading={6} className={styles.title}>
                            City
                        </Title>
                        <Text>{user.address.city}</Text>
                    </div>
                    <div className={styles.item}>
                        <Title heading={6} className={styles.title}>
                            Country
                        </Title>
                        <Text>{user.address.country}</Text>
                    </div>
                </div>
            </div>
        </div>
    );
}
