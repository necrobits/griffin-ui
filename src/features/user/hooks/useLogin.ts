import { useApi } from '~/hooks';
import { AuthSignInInput, ErrorResponse, login } from '~/services';
import { UseMutationOptions } from 'react-query';
import { User } from '~/models';

export const useLogin = (config?: UseMutationOptions<User, ErrorResponse, AuthSignInInput>) => {
    return useApi<User, AuthSignInInput>(login, 'login', null, config);
};
