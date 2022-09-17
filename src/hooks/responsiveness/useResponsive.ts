import React from 'react';
import { useMediaQuery } from 'react-responsive';

export function useResponsive() {
    const isDesktop = useMediaQuery({
        query: '(min-width: 1224px)'
    });
    const isTablet = useMediaQuery({
        query: '(max-width: 1223px)'
    });
    const isMobile = useMediaQuery({
        query: '(max-width: 786px)'
    });
    const isPortrait = useMediaQuery({
        query: '(orientation: portrait)'
    });
    const isRetina = useMediaQuery({
        query: '(max-resolution: 300dpi)'
    });

    return { isDesktop, isTablet, isMobile, isPortrait, isRetina };
}
