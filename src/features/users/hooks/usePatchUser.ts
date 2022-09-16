import { useApi } from '~/hooks';
import { ErrorResponse, patchUser } from '~/services';
import { UseMutationOptions } from 'react-query';
import { User } from '~/models';
import { PatchUserInput } from '~/services/users/types';

export const usePatchUser = (userId: string, config?: UseMutationOptions<User, ErrorResponse, PatchUserInput>) => {
    return useApi<User, PatchUserInput>(patchUser, ['user', userId], null, config);
};
