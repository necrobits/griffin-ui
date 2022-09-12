import { Middleware } from 'gobits';
import _ from 'lodash';

type MockAPIRoutesConfig = {
    [methodAndEndpoint: string]: any;
};

export type MockAPIConfig = MockAPIRoutesConfig | MockAPIRoutesConfig[];

export function mockApi(baseUrl: string, config: MockAPIConfig): Middleware {
    if (!_.isArray(config)) {
        config = [config];
    }

    const routeResponse = _.reduce(
        config,
        (acc, singleCfg: any) => {
            const modifiedCfg = _.mapKeys(singleCfg, (_, k) => {
                const keyParts = k.split(' ');
                const method = keyParts[0].toUpperCase();
                const url = keyParts[1];
                if (url.startsWith('/')) {
                    return `${method} ${baseUrl + url}`;
                }
                return `${method} ${url}`;
            });
            return _.merge(acc, modifiedCfg);
        },
        {}
    );

    return async (req, res, next, responded) => {
        if (responded) {
            return next();
        }
        const { url, method } = req;
        const routeKey = `${method} ${url}`;
        if (routeKey in routeResponse) {
            const handler = routeResponse[routeKey];
            let response = handler;
            let status = 200;
            if (_.isFunction(handler)) {
                const retval = await handler({
                    headers: req.headers,
                    method: req.method,
                    query: { ...req.query },
                    url: req.url,
                    body: req.body
                });
                response = retval.body;
                status = retval.status || status;
            }
            res.body = response;
            res.status = status;
            res.markAsResponded();
        }
        return next();
    };
}
