import { useMutation, UseMutationOptions, useQueryClient } from 'react-query';
import { ErrorResponse } from '~/services';
import { TQueryKey } from '~/hooks/queries/types';

export function useGenericMutation<Res, Input = unknown>(
    func: (input?: Input) => Promise<Res>,
    key: TQueryKey,
    updater?: ((oldData: Res, newData: Res) => Res) | undefined,
    config?: UseMutationOptions<Res, ErrorResponse, Input>
) {
    const queryClient = useQueryClient();
    let onError, onSettled;
    if (config) {
        onError = config.onError;
        onSettled = config.onSettled;
        delete config['onError'];
        delete config['onSettled'];
    } else {
        config = {};
    }
    return useMutation<Res, ErrorResponse, Input>({
        retry: false,
        mutationFn: func,
        onMutate: async newData => {
            await queryClient.cancelQueries(key);

            const previousData = queryClient.getQueryData(key);

            // Optimistically update to the new value
            queryClient.setQueryData<Res>(key, oldData => {
                return updater ? updater(oldData!, newData as unknown as Res) : oldData;
            });

            return previousData;
        },
        // If the mutation fails, use the context returned from onMutate to roll back
        onError: (error, variables, context) => {
            queryClient.setQueryData(key, context);
            if (onError) {
                onError(error, variables, context);
            }
        },
        onSettled: async (data, error, variables, context) => {
            await queryClient.invalidateQueries(key);
            if (onSettled) {
                onSettled(data, error, variables, context);
            }
        },
        ...config
    });
}
