import { useQueryClient } from 'react-query';
import { TQueryKey } from './types';
import { ErrorResponse } from '~/services';

export async function usePrefetch<Res, Selector = Res>(func: () => Promise<Res>, key: TQueryKey) {
    const queryClient = useQueryClient();
    return queryClient.prefetchQuery<Res, ErrorResponse, Selector, TQueryKey>(key, () => func());
}
