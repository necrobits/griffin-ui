import React, { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import Go from '~/global/gobits';

export default function Example() {
    const [res, setRes] = useImmer([]);
    useEffect(() => {
        Go.get('/users').then(r =>
            setRes(d => {
                d.push(r.body);
            })
        );
        Go.get('/clients').then(r =>
            setRes(d => {
                d.push(r.body);
            })
        );
        Go.get('/users/1').then(r =>
            setRes(d => {
                d.push(r.body);
            })
        );
        Go.get('/clients/1').then(r =>
            setRes(d => {
                d.push(r.body);
            })
        );
        Go.post('/users').then(r =>
            setRes(d => {
                d.push(r.body);
            })
        );
    }, []);
    return (
        <div>
            <h1>This is a test page</h1>
            <pre>{JSON.stringify(res, null, 2)}</pre>
        </div>
    );
}
