import React from 'react'
import { UseMutationOptions } from 'react-query'
import { useApi } from '~/hooks'
import { User } from '~/models'
import { deleteUser, ErrorResponse } from '~/services'

export default function useDeleteUser(config?: UseMutationOptions<User, ErrorResponse, unknown>) {
  return useApi<User, unknown>(deleteUser, ['users'], null, config);
}
