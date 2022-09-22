import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpAccount from '../SignUpAccount/SignUpAccount';
import SignUpContact from '../SignUpContact';
import SignUpProfile from '../SignUpProfile';

export default function Signup() {
    const navigate = useNavigate();

    const [values, setValues] = useState<Record<string, any>>({});
    const [currentPage, setCurrentPage] = useState(0);

    const onNext = formValues => {
        setValues({ ...values, ...formValues });
        setCurrentPage(prev => (prev += 1));
    };

    const onBack = formValues => {
        setValues({ ...values, ...formValues });
        setCurrentPage(prev => (prev -= 1));
    };

    const onSubmit = () => {
        navigate('/');
    };

    const pages = [
        {
            title: 'Create account',
            content: <SignUpAccount preValues={values} onNext={onNext} />
        },
        {
            title: 'Set up your profile',
            content: <SignUpProfile preValues={values} onBack={onBack} onNext={onNext} />
        },
        {
            title: 'Set up your contact',
            content: <SignUpContact preValues={values} onBack={onBack} onSubmit={onSubmit} />
        }
    ];

    return pages[currentPage].content;
}
