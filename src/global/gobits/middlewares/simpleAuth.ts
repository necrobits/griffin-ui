import { LStorage } from '~/storage';
import { AUTH_TOKEN } from '~/constants';
import { Middleware } from 'gobits';
import { ErrorResponse } from '~/services';

function getAccessToken(): string | null {
    return LStorage.getItem(AUTH_TOKEN);
}

export const simpleAuth: Middleware = (req, _, next) => {
    const accessToken = getAccessToken();
    if (accessToken) {
        req.headers['x-auth-token'] = accessToken;
        req.headers.Authorization = `Bearer ${accessToken}`;
    }
    return next();
};

export const handleResponse: Middleware = (_, res, next) => {
    if (res.isResponded) {
        if (res.status >= 200 && res.status <= 300) {
            return next();
        }
        throw new ErrorResponse({
            statusCode: res.status,
            message: res.body.message
        });
    }
    return next();
};
