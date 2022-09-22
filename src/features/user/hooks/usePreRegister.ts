import { useApi } from '~/hooks';
import { ErrorResponse, preRegister } from '~/services';
import { UseMutationOptions } from 'react-query';

export const usePreRegister = (config?: UseMutationOptions<unknown, ErrorResponse, string>) => {
    return useApi<unknown, string>(preRegister, 'register', null, config);
};
