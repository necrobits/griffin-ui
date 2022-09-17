import { createHive } from '@redux-hive/core';
import { SearchState } from '~/models';
import { SearchActionTypes } from './search.action';

const initialState: SearchState = {
    enteredInput: '',
    changedInput: ''
};

export const searchHive = createHive<SearchState>({
    name: 'search',
    initialState,
    reducers: {
        [SearchActionTypes.enteredInput]: (state, action) => {
            state.enteredInput = action.payload;
        },
        [SearchActionTypes.changedInput]: (state, action) => {
            state.changedInput = action.payload;
        },
        [SearchActionTypes.clearInput]: state => {
            state.changedInput = '';
            state.enteredInput = '';
        }
    }
});
