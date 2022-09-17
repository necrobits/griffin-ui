import users from './users.json';
import { changePasswordController, deleteUserController, getMeController, getUserController, getUsersController, loginController, patchUserController } from './controllers';

const generateGetUserEndpoints = () => {
    let reqRes = {};

    users.forEach(user => {
        const res = {};
        const key = `GET /users/${user.id}`;
        res[key] = getUserController(user.id);
        reqRes = { ...reqRes, ...res };
    });
    return reqRes;
};

const generatePatchUserEndpoints = () => {
    let reqRes = {};

    users.forEach(user => {
        const res = {};
        const key = `PATCH /users/${user.id}`;
        res[key] = patchUserController(user.id);
        reqRes = { ...reqRes, ...res };
    });
    return reqRes;
};

const generateChangePasswordEndpoints = () => {
    let reqRes = {};

    users.forEach(user => {
        const res = {};
        const key = `PATCH /users/${user.id}/change_password`;
        res[key] = changePasswordController(user.id);
        reqRes = { ...reqRes, ...res };
    });
    return reqRes;
};

const generateDeleteUserEndpoints = () => {
    let reqRes = {};

    users.forEach(user => {
        const res = {};
        const key = `DELETE /users/${user.id}`;
        res[key] = deleteUserController(user.id);
        reqRes = { ...reqRes, ...res };
    });
    return reqRes;
};

export const getUsersEndpoint = { 'GET /users': getUsersController };
export const getUserEndpoints = generateGetUserEndpoints();
export const patchUserEndpoints = generatePatchUserEndpoints();
export const deleteUserEndpoints = generateDeleteUserEndpoints();
export const getMeEndpoint = { 'GET /auth/me': getMeController };
export const changePasswordEndpoints = generateChangePasswordEndpoints();
export const loginEndpoint = { 'POST /authaccount/login': loginController };
