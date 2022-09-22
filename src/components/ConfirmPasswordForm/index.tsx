import React from 'react';
import { Form } from '@douyinfe/semi-ui';

type Props = {
    labelPassword: string;
    labelConfirmPassword: string;
    labelPosition?: 'top' | 'left' | 'inset';
    placeholderPassword?: string;
    placeholderConfirmPassword?: string;
    noMatchingText?: string;
};

export default function ConfirmationPasswordForm({ labelPassword, labelConfirmPassword, placeholderPassword, placeholderConfirmPassword, noMatchingText, labelPosition }: Props) {
    const validateConfirmPassword = (val, values) => {
        if (!val) {
            return 'This field should not be empty';
        }
        if (values.password !== val) {
            return noMatchingText || 'Password does not match';
        }
        return '';
    };

    return (
        <>
            <Form.Input field='password' label={labelPassword} trigger='blur' type='password' placeholder={placeholderPassword} labelPosition={labelPosition} />

            <Form.Input
                field='confirmPassword'
                label={labelConfirmPassword}
                trigger='blur'
                type='password'
                labelPosition={labelPosition}
                placeholder={placeholderConfirmPassword}
                validate={validateConfirmPassword}
            />
        </>
    );
}
