import { User } from '~/models/user';
import Go from '~/global/gobits';
import { Response } from 'gobits';
import { BaseFilterParams, RequestResponse } from '~/services/index';

export type UsersFetchInput = BaseFilterParams;

export interface UsersResponse {
    data: User[];
}

/* For Dev Mode */
/* Transform users response from Json-server
 * froom type T[] to ReqeustResponse<T> */
function transformInfiniteResponse<T>(oldRes: Response<T[]>) {
    const newRes: RequestResponse<T> = {
        total: oldRes.body.length,
        results: oldRes.body
    }
    return newRes;
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
    return Go.get<User[]>('/users', { query: { ...params } }).then(res => transformInfiniteResponse(res));
};

export const fetchUser = ({queryKey}) => {
    const [_key, userId] = queryKey;
    return Go.get<User>(`/users/${userId}`).then(res => res.body);
}
