const serverUrl = import.meta.env.VITE_SERVER_URL;
const apiPrefix = import.meta.env.VITE_SERVER_API_PREFIX;

const Config = {
    isDev: import.meta.env.DEV,
    serverUrl: serverUrl,
    serverApi: `${serverUrl}${apiPrefix ? `/${apiPrefix}` : ''}`
};
export default Config;
