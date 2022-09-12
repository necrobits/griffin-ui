import React, { useEffect, useState } from 'react';
import { Input } from '@douyinfe/semi-ui';
import styles from './Search.module.scss';
import { InputProps } from '@douyinfe/semi-ui/lib/es/input';
import { useDispatch, useSelector } from 'react-redux';
import { changedInput, clearInput, enteredInput, getChangedInput } from '~/features/search';
import ReactDOM from 'react-dom';
import SearchDropdown from '../SearchDropdown';
import SearchedUsers from '../SearchedUsers';

export default function Search(props: InputProps) {
    const dispatch = useDispatch();
    const currentChangedInput = useSelector(getChangedInput);
    const [isSearching, setIsSearching] = useState(false);
    const [searched, setSearched] = useState(false);
    const [value, setValue] = useState(currentChangedInput);

    const components = [
        {
            name: 'Users',
            component: SearchedUsers
        }
    ];

    useEffect(() => {
        setValue(currentChangedInput);
    }, [currentChangedInput]);

    const onClearClicked = () => {
        dispatch(clearInput());
    };

    const onInputChanged = (value: string) => {
        setValue(value);
        if (value.length > 1) {
            setIsSearching(true);
            dispatch(changedInput(value));
        }
        if (currentChangedInput !== '' && value.length <= 1) {
            setIsSearching(false);
            dispatch(clearInput());
        }
    };

    const onInputEntered = e => {
        dispatch(enteredInput(e.target.value));
    };

    return ReactDOM.createPortal(
        <>
            <Input {...props} className={styles.search} onChange={onInputChanged} onEnterPress={onInputEntered} onClear={onClearClicked} value={value} />
            <div className={styles.overlay}></div>
            <SearchDropdown input={value} isSearching={isSearching} searched={searched} setSearched={setSearched} components={components} />
        </>,
        document.getElementById('search-portal')
    );
}
