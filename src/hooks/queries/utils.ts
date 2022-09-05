import { InfiniteData } from 'react-query';
import { RequestResponse } from '~/services';
import _ from 'lodash';

export function getResultsFromInfiniteFetch<T>(data: InfiniteData<RequestResponse<T>> | undefined): T[] {
    if (!data) {
        return [];
    }
    return _.flatten(
        data.pages.map(page => {
            return page.results;
        })
    );
}
