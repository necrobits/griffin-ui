import _ from 'lodash';
import { isArray, isPlainObject, map } from 'lodash/fp';

function createKeyIteratee(converter, self) {
    return (result, value, key) => _.set(result, converter(key), self(value));
}

function createNestedKeyTransformer(keyConverter) {
    return function t(node) {
        if (isArray(node)) return map(t, node);
        if (isPlainObject(node)) return _.transform(node, createKeyIteratee(keyConverter, t));
        return node;
    };
}

export const snakeToCamelCase = createNestedKeyTransformer(_.camelCase);
export const camelToSnakeCase = createNestedKeyTransformer(_.snakeCase);
