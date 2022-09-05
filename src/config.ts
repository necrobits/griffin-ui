const serverUrl = import.meta.env.VITE_SERVER_URL;
const apiPrefix = import.meta.env.VITE_SERVER_API_PREFIX;

const Config = {
    isDev: import.meta.env.DEV,
    isMockingApi: `${import.meta.env.VITE_MOCK_API}`.toLowerCase() === 'true',
    serverUrl: serverUrl,
    serverApi: `${serverUrl}${apiPrefix ? `/${apiPrefix}` : ''}`
};
export default Config;
