import { createHive } from '@redux-hive/core';
import { UserState } from '~/models';
import { UserActionTypes } from './user.action';
import { LStorage } from '~/storage';
import { AUTH_TOKEN } from '~/constants';

const initialState: UserState = {
    currentUser: undefined,
    error: null,
    isAuthing: false
};
export const userHive = createHive<UserState>({
    name: 'user',
    initialState,
    reducers: {
        [UserActionTypes.errorOccurred]: (state, action) => {
            state.isAuthing = false;
            state.error = action.payload;
        },
        [UserActionTypes.fetchingUser]: state => {
            state.isAuthing = true;
            state.error = null;
        },
        [UserActionTypes.fetchedUser]: (state, action) => {
            state.currentUser = action.payload;
            state.isAuthing = false;
        },

        [UserActionTypes.logout]: state => {
            LStorage.removeItem(AUTH_TOKEN);
            state.currentUser = null;
            state.isAuthing = false;
        }
    }
});
