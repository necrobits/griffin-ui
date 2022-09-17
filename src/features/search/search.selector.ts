import { AppState } from '~/models';
import { createSelector } from 'reselect';

const search = (state: AppState) => state.search;

export const getChangedInput = createSelector(search, search => search.changedInput);
export const getEnteredInput = createSelector(search, search => search.enteredInput);
