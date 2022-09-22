import React, { useState } from 'react';
import { Button, Form, Spin } from '@douyinfe/semi-ui';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';
import { useOutletContext } from 'react-router-dom';
import { User } from '~/models';
import { usePatchUser } from '../../hooks/usePatchUser';
import ChangePassword from '../ChangePassword';
import styles from '../UserForm.module.scss';
import ErrorMessage from '@douyinfe/semi-ui/lib/es/form/errorMessage';
import Label from '@douyinfe/semi-ui/lib/es/form/label';
import NotificationModal from '~/components/NotificationModal';

type Props = {
    user?: User;
};

export default function UserAccount({ user: propUser }: Props) {
    let user: User = useOutletContext();
    if (propUser) {
        user = propUser;
    }
    const { isLoading, mutate: patchUser, error } = usePatchUser(`${user.id}`);

    const [isBackupEmailDisabled, setIsBackupEmailDisabled] = useState(true);
    const [isChangePwdVisible, setIsChangePwdVisible] = useState(false);
    const [successVisible, setSuccessVisible] = useState(false);
    const [showAddBackup, setShowAddBackup] = useState(false);

    const handleChangeBackupEmail = () => {
        setIsBackupEmailDisabled(prev => !prev);
    };
    const handleChangePwdClicked = () => {
        setIsChangePwdVisible(true);
    };
    const handleSubmit = values => {
        const fields = values;
        patchUser(
            { userId: user.id, ...fields },
            {
                onSuccess: () => {
                    setSuccessVisible(true);
                }
            }
        );
    };
    const handlePwdMdalClosed = () => {
        setIsChangePwdVisible(false);
    };
    const handleSuccessClosed = () => {
        setIsBackupEmailDisabled(true);
        setSuccessVisible(false);
    };

    return (
        <div className={styles.formContainer}>
            <Spin spinning={isLoading} style={{ width: '100%' }}>
                <div className={styles.formHeader}>
                    <Label width={205}>Email</Label>
                    <Text>{user.email}</Text>
                </div>
                <Form className={styles.formBody} labelPosition='left' labelWidth={200} onSubmit={handleSubmit}>
                    {!!error && <ErrorMessage error={`${error.statusCode}: ${error.message}`} />}
                    <Form.Slot className={styles.formGroup} label={'Backup email'}>
                        {user.backupEmail ? (
                            <>
                                <Form.Input className={styles.formInput} field='backup_email' noLabel initValue={user.backupEmail} disabled={isBackupEmailDisabled} />
                                <Button onClick={handleChangeBackupEmail} type={'tertiary'} theme={'solid'}>
                                    Change backup email
                                </Button>
                            </>
                        ) : showAddBackup ? (
                            <>
                                <Form.Input className={styles.formInput} field='backup_email' noLabel placeholder={'Backup email...'} />
                                <Button type={'tertiary'} theme={'solid'} onClick={() => setShowAddBackup(false)}>
                                    Cancel
                                </Button>
                            </>
                        ) : (
                            <>
                                <Text className={styles.formInfo}>There is still no backup email</Text>
                                <Button type={'tertiary'} theme={'solid'} onClick={() => setShowAddBackup(true)}>
                                    Add backup email
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
                        <ChangePassword visible={isChangePwdVisible} userId={user.id} onClose={handlePwdMdalClosed} />
                    </Form.Slot>
                    <Button className={styles.formSaveBtn} htmlType={'submit'} type={'primary'} theme={'solid'}>
                        Save changes
                    </Button>
                </Form>
                <NotificationModal text={'Successful! Account updated.'} visible={successVisible} onClose={handleSuccessClosed} />
            </Spin>
        </div>
    );
}
