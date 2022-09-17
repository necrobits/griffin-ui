import React, { useState } from 'react';
import { IconEdit, IconFemale, IconMale } from '@douyinfe/semi-icons';
import { Avatar, Button, Form, Select, Spin } from '@douyinfe/semi-ui';
import Title from '@douyinfe/semi-ui/lib/es/typography/title';
import { User } from '~/models';
import styles from '../UserForm.module.scss';
import { usePatchUser } from '../../hooks/usePatchUser';
import UpdatedSuccessModal from '~/components/UpdatedSuccessModal';
import ErrorMessage from '@douyinfe/semi-ui/lib/es/form/errorMessage';

type Props = {
    user: User;
    onSubmitted: () => void;
};

export default function UserProfileForm({ user, onSubmitted: submitted }: Props) {
    const { isLoading, mutate: patchUser, error } = usePatchUser(`${user.id}`);
    const [successVisible, setSuccessVisible] = useState(false);
    const [formBirthDate, setFormBirthDate] = useState(user.birthDate);

    const avatar = (
        <Avatar className={styles.avatar} src={user.avatar ? user.avatar : null}>
            {user.avatar ? '' : User.getShortName(user.firstName, user.lastName)}
        </Avatar>
    );

    const handleSubmit = values => {
        const { street, post, city, country, birthDate, ...fields } = values;
        console.log(fields);
        fields.address = {
            street,
            post,
            city,
            country
        };
        fields.birthDate = formBirthDate;
        patchUser(
            { userId: user.id, ...fields },
            {
                onSuccess: () => {
                    setSuccessVisible(true);
                }
            }
        );
    };

    const handleBirthDate = (date, dateString) => {
        setFormBirthDate(dateString);
    };

    const handleSuccessClosed = () => {
        setSuccessVisible(false);
        submitted();
    };

    return (
        <div className={styles.formContainer}>
            <Spin spinning={isLoading} style={{ width: '100%' }}>
                <Form className={styles.formBody} labelPosition='left' labelWidth={200} onSubmit={handleSubmit}>
                    {!!error && <ErrorMessage error={`${error.statusCode}: ${error.message}`} />}
                    <Form.Input className={styles.formInput} field='firstName' label='First name' initValue={user.firstName} />
                    <Form.Input className={styles.formInput} field='lastName' label='Last name' initValue={user.lastName} />
                    <Form.Select field='gender' className={styles.formSelect} label='Gender' placeholder='Choose gender' initValue={user.gender}>
                        <Select.Option value='Female'>
                            <IconFemale />
                            &nbsp;Female
                        </Select.Option>
                        <Select.Option value='Male'>
                            <IconMale />
                            &nbsp;Male
                        </Select.Option>
                        <Select.Option value='Other'>
                            <IconFemale />/<IconMale />
                            &nbsp;Other
                        </Select.Option>
                    </Form.Select>
                    <Form.DatePicker field='birthDate' label='Birthday (YYYY-MM-DD)' initValue={formBirthDate} onChange={handleBirthDate} />
                    <Form.Input className={styles.formInput} field='nationality' label='Nation' initValue={user.nationality} />
                    <Form.Slot className={styles.formGroup} label='Address'>
                        <div className={styles.formAddress}>
                            <div className={styles.addressGroup}>
                                <Form.Input className={styles.formAddressInput} field='street' label='Street' labelPosition={'inset'} initValue={user.address.street} />
                                <Form.Input className={styles.formInput} field='post' label='ZIP' labelPosition={'inset'} initValue={user.address.post} />
                            </div>
                            <div className={styles.addressGroup}>
                                <Form.Input className={styles.formInput} field='city' label='City' labelPosition={'inset'} initValue={user.address.city} />
                                <Form.Input className={styles.formInput} field='country' label='Country' labelPosition={'inset'} initValue={user.address.country} />
                            </div>
                        </div>
                    </Form.Slot>
                    <Form.Input className={styles.formInput} field='phoneNumber' label='Phone number' initValue={user.phoneNumber} />
                    <Button className={styles.formSaveBtn} htmlType={'submit'} type={'primary'} theme={'solid'}>
                        Save changes
                    </Button>
                </Form>
            </Spin>
            <section className={styles.avatarSection}>
                <Title heading={6}>Profile picture</Title>
                {avatar}
                <Button className={styles.avatarEditBtn} size={'small'} icon={<IconEdit size={'small'} />}>
                    Edit
                </Button>
            </section>
            <UpdatedSuccessModal visible={successVisible} onClose={handleSuccessClosed} />
        </div>
    );
}
