import _ from 'lodash';
import usersJson from './users.json';

let users = usersJson;

const getUsersController = req => {
    const pageSize = req.query.page_size || users.length;
    const page = parseInt(req.query.page) || 1;

    let usersList = [...users];

    if (req.query.name?.length > 0) {
        const searchStr = req.query.name.toLowerCase();
        usersList = usersList.filter(user => `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchStr));
    }

    const total = usersList.length;
    const pagesAmount = Math.ceil(total / pageSize);
    const prev = page - 1 > 0 ? page - 1 : undefined;
    const next = page + 1 <= pagesAmount ? page + 1 : undefined;
    const results = usersList.slice(pageSize * (page - 1), pageSize * page);

    return {
        status: 200,
        body: {
            pagination: {
                prev,
                next,
                first: 1,
                last: pagesAmount
            },
            total,
            results
        }
    };
};

const getUserController = userId => {
    return req => {
        const user = users.find(u => u.id === parseInt(userId));
        return {
            status: 200,
            body: user
        };
    };
};

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

const loginController = req => {
    const email = req.body.username;
    const reqPassword = req.body.password;

    const user = users.find(u => u.email === email);
    if (user === undefined) {
        return {
            status: 401,
            body: {
                message: 'Email not found'
            }
        };
    }

    const match = user.password === reqPassword;
    if (!match) {
        return {
            status: 401,
            body: {
                message: 'Password does not match'
            }
        };
    }

    const { password, ...resUser } = user;

    return {
        status: 201,
        body: {
            user: resUser,
            token: resUser.id
        }
    };
};

const getMeController = req => {
    const id: string = req.headers['x-auth-token'];
    if (id === '')
        return {
            status: 401,
            body: {
                message: 'Token not found'
            }
        };
    const user = users.find(u => u.id === parseInt(id));
    if (user === undefined) {
        return {
            status: 401,
            body: {
                message: 'Token invalid'
            }
        };
    }

    return {
        status: 200,
        body: user
    };
};

const patchUserController = userId => req => {
    const fields = req.body;
    const user = users.find(u => u.id === parseInt(userId));

    Object.keys(fields).forEach(key => (user[key] = fields[key]));

    users = users.filter(u => u.id !== parseInt(userId));
    users.push(user);

    const { password, ...resUser } = user;

    return {
        status: 200,
        body: resUser
    };
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

const changePasswordController = userId => req => {
    const { old_pwd, new_pwd } = req.body;
    const user = users.find(u => u.id === parseInt(userId));

    if (old_pwd !== user.password) {
        return {
            status: 400,
            body: {
                message: 'Old password does not match.'
            }
        };
    }
    user.password = new_pwd;
    users = users.filter(u => u.id !== parseInt(userId));
    users.push(user);

    return {
        status: 200,
        body: {
            message: 'Password changed'
        }
    };
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

const usersEndpoints = {
    'GET /users': getUsersController,
    ...generateGetUserEndpoints(),
    'POST /authaccount/login': loginController,
    'GET /auth/me': getMeController,
    ...generatePatchUserEndpoints(),
    ...generateChangePasswordEndpoints()
};

export default usersEndpoints;
