import { Gobits, Middleware } from 'gobits';
import Config from '~/config';
import _ from 'lodash';
import { camelToSnakeCase, snakeToCamelCase } from '~/utils';

/**
 * Because the backend API is using snake_case, we need to convert both direction:
 * Frontend <--- Backend: snake_case to camelCase
 * Frontend ---> Backend: camelCase to snake_case
 * So that we can ensure the naming convention is consistent
 */
const caseMapperMiddleware: Middleware = (req, res, next, responding) => {
    if (!responding) {
        // Frontend ---> Backend
        if (req.body) {
            if (_.isPlainObject(req.body)) {
                req.body = camelToSnakeCase(req.body);
                if (req.opts.type === 'form') {
                    req.body = createFormData({ ...req.body });
                }
            } else if (req.body instanceof FormData) {
                req.body = createFormData(req.body);
            }
        }
        req.query = camelToSnakeCase(req.query);
        return next();
    }
    // Frontend <--- Backend
    if (req.opts.skipSnakeToCamelCaseTransformer !== true) {
        res.body = snakeToCamelCase(res.body);
    }
    return next();
};

function createFormData(formBody: Record<string, any> | FormData): FormData {
    const form = new FormData();
    for (const pair of formBody.entries()) {
        if (pair[1]) {
            form.append(_.snakeCase(pair[0]), pair[1]);
        }
    }
    return form;
}

const Go = new Gobits({
    baseUrl: Config.serverApi,
    defaultOpts: { cache: 'no-store', credentials: 'include' }
});
Go.use(caseMapperMiddleware);

export default Go;
