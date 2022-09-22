import React, { useMemo, useState } from 'react';
import { Button, Col, Form, Row, Select, Space, Spin } from '@douyinfe/semi-ui';
import { useRegister } from '../../hooks';
import ErrorMessage from '@douyinfe/semi-ui/lib/es/form/errorMessage';
import _ from 'lodash';
import formStyles from '~/theme/scss/Forms/AuthForm.module.scss';
import { AuthSignUpInput } from '~/services';
import { useDispatch } from 'react-redux';
import { catchUserActionError, fetchedUser } from '../../user.action';

export default function SignUpContact({ preValues, onBack: back, onSubmit: submit }) {
    const dispatch = useDispatch();
    const { mutate: register, isLoading, error } = useRegister();

    const onBack = formValues => {
        back(formValues);
    };

    const onSubmit = (formValues: Record<string, any>) => {
        const { street, post, city, country, ...values }: any = { ...preValues, ...formValues };
        values.address = {};
        values.address.street = street;
        values.address.post = post;
        values.address.city = city;
        values.address.country = country;

        register(values, {
            onSuccess: user => {
                dispatch(fetchedUser(user));
                submit();
            },
            onError: e => {
                dispatch(catchUserActionError(e));
            }
        });
    };

    return (
        <Spin spinning={isLoading} style={{ width: '100%' }}>
            {!isLoading && (
                <Form onSubmit={onSubmit}>
                    {({ values }) => (
                        <>
                            {!!error && <ErrorMessage error={error.message} />}
                            <Form.Input field='backupEmail' label={{ text: 'Backup email ', optional: true }} placeholder='Backup email' initValue={preValues?.backupEmail ?? ''} />
                            <Form.Input field='phoneNumber' label={{ text: 'Phone number ', optional: true }} placeholder='Phone number' initValue={preValues?.phoneNumber ?? ''} />
                            <Form.Label optional={true}>Address</Form.Label>
                            <Row type='flex' align='middle'>
                                <Col>
                                    <Form.Input
                                        field='street'
                                        label={{ text: 'Str. and Nr. ', optional: true }}
                                        labelPosition={'inset'}
                                        placeholder='Street and number'
                                        initValue={preValues?.street ?? ''}
                                    />
                                </Col>
                                <Col>
                                    <Form.Input
                                        field='post'
                                        label={{ text: 'Postcode ', optional: true }}
                                        labelPosition={'inset'}
                                        placeholder='Post code'
                                        initValue={preValues?.post ?? ''}
                                    />
                                </Col>
                                <Col>
                                    <Form.Input
                                        field='city'
                                        label={{ text: 'City ', optional: true }}
                                        labelPosition={'inset'}
                                        placeholder='City'
                                        initValue={preValues?.city ?? ''}
                                    />
                                </Col>
                                <Col>
                                    <Form.Input
                                        field='country'
                                        label={{ text: 'Country ', optional: true }}
                                        labelPosition={'inset'}
                                        placeholder='Country'
                                        initValue={preValues?.country ?? ''}
                                    />
                                </Col>
                            </Row>
                            <Row type='flex' justify='space-between' align='middle'>
                                <Col>
                                    <Button className={formStyles.formBtn} type='primary' theme='solid' onClick={() => onBack(values)}>
                                        Back
                                    </Button>
                                </Col>
                                <Col>
                                    <Button className={formStyles.formBtn} htmlType='submit' type='primary' theme='solid'>
                                        Register
                                    </Button>
                                </Col>
                            </Row>
                        </>
                    )}
                </Form>
            )}
        </Spin>
    );
}
