import { UseMutationOptions } from 'react-query';
import { useApi } from '~/hooks';
import { ErrorResponse, resetPassword } from '~/services';

export const useResetPassword = (config?: UseMutationOptions<unknown, ErrorResponse, string>) => {
    return useApi<unknown, string>(resetPassword, 'resetpassword', null, config);
};
