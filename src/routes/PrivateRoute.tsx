import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Forbidden from '~/components/Forbidden/Forbidden';
import { getCurrentUser } from '~/features/user';

type Props = {
    component: React.ComponentType;
};

const PrivateRoute: React.FC<Props> = ({ component: RouteComponent }) => {
    const user = useSelector(getCurrentUser);
    const { userId } = useParams();

    if (`${user.id}` !== userId) {
        return <Forbidden />;
    }

    return <RouteComponent />;
};

export default PrivateRoute;
