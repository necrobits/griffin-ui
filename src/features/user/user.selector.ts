import { AppState } from '~/models';
import { createSelector } from 'reselect';

const user = (state: AppState) => state.user;

export const getCurrentUser = createSelector(user, user => user.currentUser);
export const getUserError = createSelector(user, user => user.error);
export const isAuthingUser = createSelector(user, user => user.isAuthing);
