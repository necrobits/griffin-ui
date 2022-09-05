import { useInfiniteQuery, UseInfiniteQueryOptions } from 'react-query';
import { TQueryKey } from './types';
import { ErrorResponse, RequestResponse } from '~/services';

export function useLoadMore<T, Input>(
    serviceFunc: (input?: Input) => Promise<RequestResponse<T>>,
    key: string,
    params?: Input,
    config?: UseInfiniteQueryOptions<RequestResponse<T>, ErrorResponse, RequestResponse<T>>
) {
    return useInfiniteQuery<RequestResponse<T>, Error, RequestResponse<T>, TQueryKey>(
        [key, params as any],
        ({ pageParam }) => {
            return serviceFunc({ ...params, page: pageParam } as Input);
        },
        {
            ...config,
            structuralSharing: false,
            getPreviousPageParam: firstPage => firstPage.previousId ?? undefined,
            getNextPageParam: lastPage => {
                return lastPage.nextId ?? undefined;
            }
        }
    );
}
