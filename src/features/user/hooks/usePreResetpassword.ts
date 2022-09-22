import { useApi } from '~/hooks';
import { ErrorResponse, preResetPasswrod } from '~/services';
import { UseMutationOptions } from 'react-query';

export const usePreResetpassword = (config?: UseMutationOptions<unknown, ErrorResponse, string>) => {
    return useApi<unknown, string>(preResetPasswrod, 'resetpassword', null, config);
};
