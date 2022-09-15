import { Button, Form } from '@douyinfe/semi-ui';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';
import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { User } from '~/models';
import ChangePassword from '../ChangePassword';
import styles from '../UserForm.module.scss';

type Props = {
    user?: User;
};

export default function UserAccount({ user: propUser }: Props) {
    let user: User;
    const currentUser: User = useOutletContext();
    if (propUser !== undefined) {
        user = propUser;
    } else {
        user = currentUser;
    }

    const [isEmailDisabled, setIsEmailDisabled] = useState(true);
    const [isBackupEmailDisabled, setIsBackupEmailDisabled] = useState(true);
    const [visibleChangePassword, setVisibleChangePassword] = useState(false);

    const handleChangeEmail = () => {
        setIsEmailDisabled(prev => !prev);
    };
    const handleChangeBackupEmail = () => {
        setIsBackupEmailDisabled(prev => !prev);
    };
    const handleChangePwdClicked = () => {
        setVisibleChangePassword(true);
    };

    return (
        <div className={styles.formContainer}>
            <Form className={styles.formBody} labelPosition='left' labelWidth={200}>
                <Form.Slot className={styles.formGroup} label={'Primary email'}>
                    <Form.Input className={styles.formInput} field='email' noLabel initValue={user.email} disabled={isEmailDisabled} />
                    <Text className={styles.formInfo}>This will the sign in email as well as the email, which receives notifications.</Text>
                    {User.isAdmin(currentUser) ? (
                        <Button onClick={handleChangeEmail} type={'tertiary'} theme={'solid'}>
                            Change primary email
                        </Button>
                    ) : (
                        <>
                            <Text className={styles.formInfo} type={'warning'}>
                                If you want to change the primary email, you must send a request to an admin
                            </Text>
                            <Button type={'tertiary'} theme={'solid'}>
                                Request change primary email
                            </Button>
                        </>
                    )}
                </Form.Slot>
                <Form.Slot className={styles.formGroup} label={'Backup email'}>
                    {user.backupEmail ? (
                        <>
                            <Form.Input className={styles.formInput} field='backup_email' noLabel initValue={user.backupEmail} disabled={isBackupEmailDisabled} />
                            <Button onClick={handleChangeBackupEmail} type={'tertiary'} theme={'solid'}>
                                Change backup email
                            </Button>
                        </>
                    ) : (
                        <>
                            <Text className={styles.formInfo}>There is still no backup email</Text>
                            <Button type={'tertiary'} theme={'solid'}>
                                Add email
                            </Button>
                        </>
                    )}
                </Form.Slot>
                <Form.Slot className={styles.formGroup} label={'Username'}>
                    <Form.Input className={styles.formInput} field='username' noLabel initValue={user.username} />
                    <Text className={styles.formInfo}>You can also use this username to sign in.</Text>
                </Form.Slot>
                <Form.Slot className={styles.formGroup} label={'Password'}>
                    <Button type={'tertiary'} theme={'solid'} onClick={handleChangePwdClicked}>
                        Change password
                    </Button>
                    <ChangePassword visible={visibleChangePassword} setVisible={setVisibleChangePassword} />
                </Form.Slot>
                <Button className={styles.formSaveBtn} htmlType={'submit'} type={'primary'} theme={'solid'}>
                    Save changes
                </Button>
            </Form>
        </div>
    );
}
