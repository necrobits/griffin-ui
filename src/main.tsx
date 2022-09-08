import React from 'react';
import ReactDOM from 'react-dom';
import '~/index.scss';
import App from '~/App';
import { store } from '~/global/store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import en_GB from '@douyinfe/semi-ui/lib/es/locale/source/en_GB';
import { LocaleProvider } from '@douyinfe/semi-ui';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <LocaleProvider locale={en_GB}>
                        <App />
                    </LocaleProvider>
                    <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
                </QueryClientProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
