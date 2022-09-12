import { Spin } from '@douyinfe/semi-ui';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { fetchedUser } from '~/features/user';
import { useGetMe } from '~/hooks/queries/useGetMe';

type LocationState = {
    redirectPath: string;
};

export default function PersistLogin() {
    const dispatch = useDispatch();
    const { data, isLoading } = useGetMe();
    const location = useLocation();
    let redirectPath = '/';

    if (location.state) {
        redirectPath = (location.state as LocationState).redirectPath;
    }

    if (isLoading) {
        return (
            <Spin
                spinning={true}
                size='large'
                style={{
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            />
        );
    }

    if (!isLoading) {
        dispatch(fetchedUser(data));
        return <Navigate to={redirectPath} />;
    }
}
