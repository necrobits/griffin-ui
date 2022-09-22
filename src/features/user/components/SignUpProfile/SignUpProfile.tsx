import React, { useMemo, useState } from 'react';
import { Button, Col, Form, Row } from '@douyinfe/semi-ui';
import _ from 'lodash';
import formStyles from '~/theme/scss/Forms/AuthForm.module.scss';
import { IconFemale, IconMale } from '@douyinfe/semi-icons';
import countryList from 'react-select-country-list';

export default function SignUpProfile({ preValues, onBack: back, onNext: next }) {
    const [formBirthDate, setFormBirthDate] = useState(preValues?.birthDate ?? '');
    const options = useMemo(() => countryList().getData(), []);

    const handleBirthDate = (date, dateString) => {
        setFormBirthDate(dateString);
    };

    const onBack = formValues => {
        const values = formValues;
        values.birthDate = formBirthDate;
        back(values);
    };

    const onSubmit = formValues => {
        const values = formValues;
        values.birthDate = formBirthDate;
        next(values);
    };

    return (
        <Form onSubmit={onSubmit} className={formStyles.form}>
            {({ values }) => (
                <>
                    <Form.Input
                        field='firstName'
                        label='First name'
                        placeholder='First name'
                        trigger='blur'
                        rules={[
                            {
                                required: true,
                                message: 'First name is required.'
                            }
                        ]}
                        initValue={preValues?.firstName ?? ''}
                    />
                    <Form.Input
                        field='lastName'
                        label='Last name'
                        placeholder='Last name'
                        trigger='blur'
                        rules={[
                            {
                                required: true,
                                message: 'Last name is required.'
                            }
                        ]}
                        initValue={preValues?.lastName ?? ''}
                    />
                    <Form.Select field='gender' label='Gender' placeholder='Choose gender' initValue={preValues?.gender ?? 'Other'}>
                        <Form.Select.Option value='Female'>
                            <IconFemale />
                            &nbsp;Female
                        </Form.Select.Option>
                        <Form.Select.Option value='Male'>
                            <IconMale />
                            &nbsp;Male
                        </Form.Select.Option>
                        <Form.Select.Option value='Other'>
                            <IconFemale />/<IconMale />
                            &nbsp;Other
                        </Form.Select.Option>
                    </Form.Select>
                    <Form.DatePicker
                        field='birthDate'
                        label='Birthday (YYYY-MM-DD)'
                        initValue={formBirthDate}
                        onChange={handleBirthDate}
                        trigger='blur'
                        rules={[
                            {
                                required: true,
                                message: 'Please give your birthday.'
                            }
                        ]}
                    />
                    <Form.Select
                        field='nation'
                        optionList={options}
                        label={'Nationality'}
                        placeholder={'Nationality'}
                        initValue={preValues?.nation}
                        rules={[
                            {
                                required: true,
                                message: 'This field is required.'
                            }
                        ]}></Form.Select>
                    <Row type='flex' justify='space-between' align='middle'>
                        <Col>
                            <Button className={formStyles.formBtn} type='primary' theme='solid' onClick={() => onBack(values)}>
                                Back
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                className={formStyles.formBtn}
                                disabled={_.isEmpty(values.firstName) || _.isEmpty(values.lastName) || _.isEmpty(formBirthDate) || _.isEmpty(values.nation)}
                                htmlType='submit'
                                type='primary'
                                theme='solid'>
                                Next
                            </Button>
                        </Col>
                    </Row>
                </>
            )}
        </Form>
    );
}
