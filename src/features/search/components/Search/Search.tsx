import React, { useEffect, useState } from 'react';
import { Input } from '@douyinfe/semi-ui';
import styles from './Search.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changedInput, clearInput, enteredInput, getChangedInput } from '~/features/search';
import { InputProps } from '@douyinfe/semi-ui/lib/es/input';

export default function Search(props: InputProps) {
    const dispatch = useDispatch();
    const currentChangedInput = useSelector(getChangedInput);
    const [value, setValue] = useState(currentChangedInput);

    useEffect(() => {
        setValue(currentChangedInput);
    }, [currentChangedInput]);

    const onClearClicked = () => {
        dispatch(clearInput());
    };

    const onInputChanged = (value: string) => {
        setValue(value);
        if (value.length > 1) {
            dispatch(changedInput(value));
        }
        if (currentChangedInput !== '' && value.length <= 1) {
            dispatch(clearInput());
        }
    };

    const onInputEntered = e => {
        dispatch(enteredInput(e.target.value));
    };

    return <Input {...props} onChange={onInputChanged} onEnterPress={onInputEntered} onClear={onClearClicked} value={value} />;
}
