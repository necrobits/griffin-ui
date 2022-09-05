import React from 'react';
import './style.scss';

export default function Forbidden() {
    return (
        <div className='forbidden-wrapper'>
            <div>403</div>
            <div className='txt'>
                Forbidden<span className='blink'>_</span>
            </div>
        </div>
    );
}
