import { TQueryKey, useAutoLoadInfinite, useFetch } from '~/hooks';
import { ErrorResponse, fetchUsers, RequestResponse, UsersFetchInput } from '~/services';
import { User } from '~/models';
import { UseInfiniteQueryOptions, UseQueryOptions } from 'react-query';
import { DEFAULT_AUTO_LOAD_PAGE_SIZE } from '~/constants';

export const useFetchUsers = (params?: UsersFetchInput, config?: UseQueryOptions<RequestResponse<User>, ErrorResponse, RequestResponse<User>, TQueryKey>) => {
    return useFetch<RequestResponse<User>, RequestResponse<User>>(fetchUsers, ['users', params], config);
};
