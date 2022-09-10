import React, { useEffect, useState } from 'react';

/* To see skeleton effect */
export function useDevLoading() {
    const [devLoading, setDevLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setDevLoading(false), 1000);
    }, []);

    return devLoading;
}
