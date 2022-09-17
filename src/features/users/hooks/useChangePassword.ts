import { useApi } from '~/hooks';
import { changePassword, ErrorResponse } from '~/services';
import { UseMutationOptions } from 'react-query';
import { User } from '~/models';
import { ChangePasswordInput } from '~/services/users/types';

export const useChangePassword = (userId: string, config?: UseMutationOptions<unknown, ErrorResponse, ChangePasswordInput>) => {
    return useApi<unknown, ChangePasswordInput>(changePassword, ['user', userId], null, config);
};
