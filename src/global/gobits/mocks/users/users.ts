import {
    changePasswordEndpoints,
    deleteUserEndpoints,
    getMeEndpoint,
    getUserEndpoints,
    getUsersEndpoint,
    loginEndpoint,
    patchUserEndpoints,
    preRegisterEndpoint,
    preResetPwdEndpoint,
    registerEndpoint
} from './endpoints';

console.log('Users');

const usersEndpoints = {
    ...getUsersEndpoint,
    ...getUserEndpoints,
    ...patchUserEndpoints,
    ...deleteUserEndpoints,
    ...getMeEndpoint,
    ...changePasswordEndpoints,
    ...loginEndpoint,
    ...preRegisterEndpoint,
    ...registerEndpoint,
    ...preResetPwdEndpoint
};

export default usersEndpoints;
