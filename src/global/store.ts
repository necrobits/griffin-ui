import { createStore } from '@redux-hive/core';
import { searchHive } from '~/features/search';
import { userHive } from '~/features/user';

export const store = createStore({ hives: [userHive, searchHive], middlewares: [] });
