import { useEffect, useState } from 'react';
import { useFetchUsers } from './useFetchUsers';

export const useGetOnlineUsers = () => {
    const [onlineUsers, setOnlineUsers] = useState(0);
    const { data, isLoading } = useFetchUsers();

    useEffect(() => {
        if (!isLoading) {
            setOnlineUsers(data.results.filter(user => user.isActive).length);
        }
    }, [isLoading]);

    return onlineUsers;
};
