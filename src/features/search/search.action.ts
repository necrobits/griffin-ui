export const SearchActionTypes = {
    enteredInput: 'search/enteredInput',
    changedInput: 'search/changedInput',
    clearInput: 'search/clearInput'
};

export const changedInput = (input: string) => ({
    type: SearchActionTypes.changedInput,
    payload: input
});

export const enteredInput = (input: string) => ({
    type: SearchActionTypes.enteredInput,
    payload: input
});

export const clearInput = () => ({
    type: SearchActionTypes.clearInput
});
