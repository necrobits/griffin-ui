import { useGenericMutation } from './useGenericMutation';
import { TQueryKey } from './types';
import { UseMutationOptions } from 'react-query';
import { ErrorResponse } from '~/services';

export function useApi<Res, Input>(
    serviceFunc: (input?: Input) => Promise<Res>,
    key: TQueryKey,
    updater?: (oldData: Res, newData: Res) => Res,
    config?: UseMutationOptions<Res, ErrorResponse, Input>
) {
    return useGenericMutation<Res, Input>(serviceFunc, key, updater, config);
}
