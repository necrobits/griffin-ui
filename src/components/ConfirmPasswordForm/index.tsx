import React from 'react';
import { Form } from '@douyinfe/semi-ui';

type Props = {
    labelPassword: string;
    labelConfirmPassword: string;
    placeholderPassword?: string;
    placeholderConfirmPassword?: string;
    noMatchingText?: string;
};
export default function ConfirmationPasswordForm({ labelPassword, labelConfirmPassword, placeholderPassword, placeholderConfirmPassword, noMatchingText }: Props) {
    const validateConfirmPassword = (val, values) => {
        if (values.password !== val) {
            return noMatchingText || 'Password does not match';
        }
        return '';
    };

    return (
        <>
            <Form.Input field='password' label={labelPassword} style={{ width: '100%' }} trigger='blur' type='password' placeholder={placeholderPassword} />

            <Form.Input
                field='confirmPassword'
                label={labelConfirmPassword}
                style={{ width: '100%' }}
                trigger='blur'
                type='password'
                placeholder={placeholderConfirmPassword}
                validate={validateConfirmPassword}
            />
        </>
    );
}
