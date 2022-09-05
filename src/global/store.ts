import { createStore } from '@redux-hive/core';
import { userHive } from '~/features/user';

export const store = createStore({ hives: [userHive], middlewares: [] });
