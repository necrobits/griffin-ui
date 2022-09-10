import React, { useEffect, useState } from 'react';
import { Input } from '@douyinfe/semi-ui';
import './Search.scss';
import { InputProps } from '@douyinfe/semi-ui/lib/es/input';
import { useDispatch, useSelector } from 'react-redux';
import { changedInput, clearInput, enteredInput, getChangedInput } from '~/features/search';
import ReactDOM from 'react-dom';

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

    return ReactDOM.createPortal(
        <>
            <Input {...props} className='search' onChange={onInputChanged} onEnterPress={onInputEntered} onClear={onClearClicked} value={value} />
            <div className='overlay'></div>
        </>,
        document.getElementById('search-portal')
    );
}
