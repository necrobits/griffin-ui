import { UseQueryOptions } from 'react-query';
import { TQueryKey, useFetch } from '~/hooks';
import { User } from '~/models';
import { ErrorResponse, loadUser } from '~/services';

export const useGetMe = (config?: UseQueryOptions<User, ErrorResponse, User, TQueryKey>) => {
    return useFetch<User, User>(loadUser, ['users', 'me'], config);
};
