import { IconSearch } from '@douyinfe/semi-icons';
import Title from '@douyinfe/semi-ui/lib/es/typography/title';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { getChangedInput } from '../../search.selector';
import Search from '../Search/Search';
import styles from './SearchDropdown.module.scss';

export default function SearchDropdown({ components }) {
    const currentChangedInput = useSelector(getChangedInput);
    const [isSearching, setIsSearching] = useState(currentChangedInput.length > 1 ? true : false);
    const [container, setContainer] = useState(null);

    useEffect(() => {
        setContainer(document.getElementById('navbarHeader-content'));
    }, []);

    useEffect(() => {
        setIsSearching(currentChangedInput.length > 1 ? true : false);
    }, [currentChangedInput]);

    const render = components.map(component => {
        const Component = component.component;
        return (
            <>
                <Title heading={6}>{component.name}</Title>
                <Component input={currentChangedInput} />
            </>
        );
    });

    return container && components
        ? ReactDOM.createPortal(
              <div className={styles.search}>
                  <Search className={styles.searchInput} placeholder={'Search...'} prefix={<IconSearch />} size='large' showClear />
                  {isSearching && <div className={styles.overlay} />}
                  {isSearching ? <div className={styles.searchDropdown}>{render}</div> : null}
              </div>,
              container
          )
        : null;
}
