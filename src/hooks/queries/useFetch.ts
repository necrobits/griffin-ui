import { useQuery, UseQueryOptions } from 'react-query';
import { TQueryKey } from './types';
import { ErrorResponse } from '~/services';

export function useFetch<Res, Selector = Res>(serviceFunc: ({ queryKey }) => Promise<Res>, key: TQueryKey, config?: UseQueryOptions<Res, ErrorResponse, Selector, TQueryKey>) {
    if (!config) {
        config = {};
    }
    return useQuery<Res, ErrorResponse, Selector, TQueryKey>(key, ({ queryKey }) => serviceFunc({ queryKey }), {
        enabled: true,
        retry: 1,
        ...config
    });
}
