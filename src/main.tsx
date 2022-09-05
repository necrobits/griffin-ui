import React from 'react';
import ReactDOM from 'react-dom';
import '~/index.scss';
import App from '~/App';
import { store } from '~/global/store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import en_GB from '@douyinfe/semi-ui/lib/es/locale/source/en_GB';
import Go from '~/global/gobits';
import { handleResponse, simpleAuth } from '~/global/gobits/middlewares';
import { LocaleProvider } from '@douyinfe/semi-ui';
import { BrowserRouter } from 'react-router-dom';
import Config from './config';
import { mockApi } from './global/gobits/middlewares/mockApi';

const queryClient = new QueryClient();

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <LocaleProvider locale={en_GB}>
                        <App />
                    </LocaleProvider>
                </QueryClientProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
