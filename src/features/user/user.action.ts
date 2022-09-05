import { User } from '~/models';
import { ErrorResponse } from '~/services';

export const UserActionTypes = {
    fetchingUser: 'user/fetchingUser',
    fetchedUser: 'user/fetchedUser',
    errorOccurred: 'user/errorOccurred',
    logout: 'user/logout'
};

export type UserUpdatedProfile = {
    firstName: string;
    lastName: string;
    fullName: string;
    avatar: string;
};

export const catchUserActionError = (e: ErrorResponse) => ({
    type: UserActionTypes.errorOccurred,
    payload: e
});

export const fetchingUser = () => ({
    type: UserActionTypes.fetchingUser
});

export const fetchedUser = (user: User) => ({
    type: UserActionTypes.fetchedUser,
    payload: user
});

export const logout = () => ({
    type: UserActionTypes.logout
});
