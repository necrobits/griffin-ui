import { useApi } from '~/hooks';
import { AuthSignUpInput, ErrorResponse, register } from '~/services';
import { UseMutationOptions } from 'react-query';
import { User } from '~/models';

export const useRegister = (config?: UseMutationOptions<User, ErrorResponse, AuthSignUpInput>) => {
    return useApi<User, AuthSignUpInput>(register, 'register', null, config);
};
