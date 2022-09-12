import _ from 'lodash';
import { users } from './usersList';

const generateGetUserEndpoints = () => {
    let reqRes = {};
    users.forEach(user => {
        const res = {};
        const key = `GET /users/${user.id}`;
        res[key] = user;
        reqRes = { ...reqRes, ...res };
    });
    return reqRes;
};

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

const usersEndpoints = {
    'GET /users': getUsersController,
    ...generateGetUserEndpoints(),
    'POST /authaccount/login': loginController,
    'GET /auth/me': getMeController
};

export default usersEndpoints;
