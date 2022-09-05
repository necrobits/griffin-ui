import { useInfiniteQuery, UseInfiniteQueryOptions } from 'react-query';
import { TQueryKey } from './types';
import { ErrorResponse, RequestResponse } from '~/services';
import { useEffect, useState } from 'react';

export function useAutoLoadInfinite<T, Input>(
    serviceFunc: (input?: Input) => Promise<RequestResponse<T>>,
    key: string,
    params?: Input,
    config?: UseInfiniteQueryOptions<RequestResponse<T>, ErrorResponse, RequestResponse<T>>
) {
    const [fetching, setFetching] = useState(true);

    let onError;
    if (config) {
        onError = config.onError;
        delete config['onError'];
    } else {
        config = {};
    }

    const { fetchNextPage, hasNextPage, isFetchingNextPage, ...rest } = useInfiniteQuery<RequestResponse<T>, Error, RequestResponse<T>, TQueryKey>(
        [key, params as any],
        ({ pageParam }) => {
            return serviceFunc({ ...params, page: pageParam } as Input);
        },
        {
            ...config,
            onError: e => {
                if (onError) {
                    onError(e);
                }
                setFetching(false);
            },
            structuralSharing: false,
            getPreviousPageParam: firstPage => firstPage.previousId ?? undefined,
            getNextPageParam: lastPage => {
                return lastPage.nextId ?? undefined;
            }
        }
    );
    useEffect(() => {
        if (!isFetchingNextPage && hasNextPage != undefined) {
            if (hasNextPage) {
                setFetching(true);
                fetchNextPage();
            } else {
                setFetching(false);
            }
        }
    }, [isFetchingNextPage, hasNextPage]);

    return { fetchNextPage, hasNextPage, isFetchingNextPage, fetching, ...rest };
}
