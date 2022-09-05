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
console.log('config', Config);

const mockUsers = {
    'GET /users': [
        { id: 1, name: 'ABC' },
        { id: 2, name: 'BCD' }
    ],
    'GET /users/1': {
        id: 1,
        name: 'ABC'
    },
    'POST /users': {
        id: 3,
        name: 'CDE'
    }
};

const mockClients = {
    'GET /clients': [
        { id: 1, name: 'Client1' },
        { id: 2, name: 'Client2' }
    ],
    'GET /clients/1': {
        id: 1,
        name: 'Client1'
    }
};

if (Config.isMockingApi) {
    Go.use(mockApi(Config.serverApi, [mockUsers, mockClients]));
}
Go.use(simpleAuth);
Go.use(handleResponse);

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
