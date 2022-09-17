import { changePasswordEndpoints, deleteUserEndpoints, getMeEndpoint, getUserEndpoints, getUsersEndpoint, loginEndpoint, patchUserEndpoints } from './endpoints';

const usersEndpoints = {
    ...getUsersEndpoint,
    ...getUserEndpoints,
    ...patchUserEndpoints,
    ...deleteUserEndpoints,
    ...getMeEndpoint,
    ...changePasswordEndpoints,
    ...loginEndpoint
};

export default usersEndpoints;
