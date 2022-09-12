import React from 'react';
import { Skeleton, Typography, Avatar, Divider } from '@douyinfe/semi-ui';
import { useSelector } from 'react-redux';
import { useOutletContext, useParams } from 'react-router-dom';
import { User } from '~/models';
import { TimeManager } from '~/utils';
import { useFetchUser } from '../../hooks';
import styles from './UserDetails.module.scss';

const { Title, Text } = Typography;

export default function UserDetails() {
    let user,
        isLoading = false;

    const { userId } = useParams();
    if (userId !== undefined) {
        const { isLoading: isUserLoading, data, error } = useFetchUser(userId);
        user = data;
        isLoading = isUserLoading;
    } else {
        user = useOutletContext();
    }

    const placeholder = (
        <div className='placeholder'>
            <Skeleton.Avatar />
            <Skeleton.Title />
            <Skeleton.Paragraph rows={2} />
            <Skeleton.Paragraph rows={2} />
        </div>
    );

    return (
        <Skeleton placeholder={placeholder} loading={isLoading}>
            {!isLoading && (
                <div className={styles.content}>
                    <div className={styles.contentHeader}>
                        <Avatar className={styles.avatar} src={user.avatar}>
                            {user.avatar ? '' : User.getShortName(user.firstName, user.lastName)}
                        </Avatar>
                        <div className={styles.nameGroup}>
                            <Title heading={1}>{User.getFullName(user)}</Title>
                            <Text type={'quaternary'}>Joined since {TimeManager.formatFromISO(user.createdAt, 'MMMM dd, yyyy')}</Text>
                        </div>
                    </div>
                    <div className={styles.contentBody}>
                        <Divider margin={'1rem'} align={'left'}>
                            Basic information
                        </Divider>
                        <div className={styles.section}>
                            <div className={styles.item}>
                                <Title heading={6} className={styles.title}>
                                    Username
                                </Title>
                                <Text>{user.username}</Text>
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
                                <Text>{user.phone}</Text>
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
            )}
        </Skeleton>
    );
}
