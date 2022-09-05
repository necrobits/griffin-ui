import React, { FC, useState } from 'react';

// libs
import { ErrorBoundary } from 'react-error-boundary';

import { Toast } from '@douyinfe/semi-ui';

const DefaultPage: FC = ({ children }): JSX.Element => {
    const [boundaryKey, setBoundaryKey] = useState(0);
    const [toastIds, setToastIds] = useState<string[]>([]);
    const [errors, setErrors] = useState<string[]>([]);
    const handleError = async (message?: any) => {
        if (errors.includes(message)) return;
        setErrors([...errors, message]);
        const id = Toast.error({
            duration: 0,
            content: message
        });
        setToastIds([...toastIds, id]);
    };

    return (
        <ErrorBoundary fallbackRender={() => <div>Oh no</div>} resetKeys={[boundaryKey]} onError={handleError}>
            {children}
        </ErrorBoundary>
    );
};

export default DefaultPage;
