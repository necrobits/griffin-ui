import { User } from '~/models/user';
import Go from '~/global/gobits';
import { BaseFilterParams, RequestResponse } from '~/services/index';

export type UsersFetchInput = BaseFilterParams;

export interface UsersResponse {
    data: User[];
}

export const fetchUsers = (opts: UsersFetchInput) => {
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
