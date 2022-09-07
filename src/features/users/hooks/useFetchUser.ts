import { UseQueryOptions } from 'react-query'
import { TQueryKey, useFetch } from '~/hooks'
import { User } from '~/models'
import { ErrorResponse, fetchUser } from '~/services'


export const useFetchUser = (userId: string, config?: UseQueryOptions<User, ErrorResponse, User, TQueryKey>) => {
  return useFetch<User, User>(fetchUser, ['user', userId ], config);
}