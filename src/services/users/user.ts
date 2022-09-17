import { User } from '~/models/user';
import Go from '~/global/gobits';
import { BaseFilterParams, RequestResponse } from '~/services/index';
import { ChangePasswordInput, PatchUserInput } from './types';

export type UsersFetchInput = BaseFilterParams;

export interface UsersResponse {
    data: User[];
}

export const fetchUsers = ({ queryKey }) => {
    const [_key, opts] = queryKey;
    const params: any = {};
    if (opts) {
        Object.keys(opts).forEach(key => {
            if (opts[key] !== undefined) {
                params[key] = String(opts[key]);
            }
        });
    }
    return Go.get<RequestResponse<User>>('/users', { query: { ...params } }).then(res => {
        return res.body;
    });
};

export const fetchUser = ({ queryKey }) => {
    const [_key, userId] = queryKey;
    return Go.get<User>(`/users/${userId}`).then(res => res.body);
};

export const changePassword = ({ userId, ...fields }: ChangePasswordInput) => {
    return Go.patch<User>(`/users/${userId}/change_password`, { body: fields }).then(res => res.body);
};

export const patchUser = ({ userId, ...fields }: PatchUserInput) => {
    return Go.patch<User>(`/users/${userId}`, { body: fields }).then(res => res.body);
};

export const deleteUser = (userId: string) => {
    return Go.delete<User>(`/users/${userId}`).then(res => res.body);
};
