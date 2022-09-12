import Title from '@douyinfe/semi-ui/lib/es/typography/title';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './SearchDropdown.module.scss';

export default function SearchDropdown({ input, searched, isSearching, setSearched, components }) {
    if (!isSearching) {
        return <></>;
    }
    const render = components.map(component => {
        const Component = component.component;
        return (
            <>
                <Title heading={6}>{component.name}</Title>
                <Component input={input} setSearched={setSearched} searched={searched} isSearching={isSearching} />
            </>
        );
    });

    return <div className={styles.searchDropdown}>{...render}</div>;
}
