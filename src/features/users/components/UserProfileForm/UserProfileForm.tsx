import React, { useState } from 'react';
import { IconEdit, IconFemale, IconMale } from '@douyinfe/semi-icons';
import { Avatar, Button, Checkbox, DatePicker, Divider, Form, Select } from '@douyinfe/semi-ui';
import Title from '@douyinfe/semi-ui/lib/es/typography/title';
import { useOutletContext } from 'react-router-dom';
import { User } from '~/models';
import styles from '../UserForm.module.scss';
import FormSlot from '@douyinfe/semi-ui/lib/es/form/slot';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';

type Props = {
    user: User;
};

export default function UserProfileForm({ user }: Props) {
    const avatar = (
        <Avatar className={styles.avatar} src={user.avatar ? user.avatar : null}>
            {user.avatar ? '' : User.getShortName(user.firstName, user.lastName)}
        </Avatar>
    );

    return (
        <div className={styles.formContainer}>
            <Form className={styles.formBody} labelPosition='left' labelWidth={200}>
                <Form.Input className={styles.formInput} field='firstname' label='First name' initValue={user.firstName} />
                <Form.Input className={styles.formInput} field='lastname' label='Last name' initValue={user.lastName} />
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
                <Form.DatePicker field='date' label='Birthday (YYYY-MM-DD)' initValue={user.birthDate} />
                <Form.Input className={styles.formInput} field='nation' label='Nation' initValue={user.nationality} />
                <Form.Slot className={styles.formGroup} label='Address'>
                    <div className={styles.formAddress}>
                        <div className={styles.addressGroup}>
                            <Form.Input className={styles.formAddressInput} field='street' label='Street' labelPosition={'inset'} initValue={user.address.street} />
                            <Form.Input className={styles.formInput} field='postcode' label='ZIP' labelPosition={'inset'} initValue={user.address.post} />
                        </div>
                        <div className={styles.addressGroup}>
                            <Form.Input className={styles.formInput} field='city' label='City' labelPosition={'inset'} initValue={user.address.city} />
                            <Form.Input className={styles.formInput} field='country' label='Country' labelPosition={'inset'} initValue={user.address.country} />
                        </div>
                    </div>
                </Form.Slot>
                <Form.Input className={styles.formInput} field='phone' label='Phone number' initValue={user.phoneNumber} />
                <Button className={styles.formSaveBtn} htmlType={'submit'} type={'primary'} theme={'solid'}>
                    Save changes
                </Button>
            </Form>
            <section className={styles.avatarSection}>
                <Title heading={6}>Profile picture</Title>
                {avatar}
                <Button className={styles.avatarEditBtn} size={'small'} icon={<IconEdit size={'small'} />}>
                    Edit
                </Button>
            </section>
        </div>
    );
}
