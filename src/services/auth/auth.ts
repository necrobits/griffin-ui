import { LStorage } from '~/storage';
import { AUTH_TOKEN } from '~/constants';
import { User } from '~/models/user';
import Go from '~/global/gobits';
import { AuthSignInInput, AuthSignUpInput } from '~/services';
import { LoginResponse, SignedUpResponse } from './types';

export function login({ email, ...opts }: AuthSignInInput) {
    return Go.post<NonNullable<LoginResponse>>('/authaccount/registration', {
        body: { username: email.toLowerCase(), ...opts }
    }).then(res => {
        return handleLoginAndSignUpResponse(res);
    });
}

export function register({ email, ...opts }: AuthSignUpInput) {
    return Go.post<NonNullable<SignedUpResponse>>('/authaccount/login', {
        body: { email: email.toLowerCase(), ...opts }
    }).then(res => {
        return handleLoginAndSignUpResponse(res);
    });
}

export function getUserProfile() {
    return Go.get<NonNullable<User>>('/auth/me')
        .then(res => {
            if (res.status === 200) {
                return res.body;
            }
        })
        .catch(err => {
            if (err.statusCode === 401) {
                LStorage.removeItem(AUTH_TOKEN);
            }
        });
}

export async function loadUser(): Promise<User | undefined> {
    let user = undefined;
    if (LStorage.getItem(AUTH_TOKEN)) {
        user = await getUserProfile();
    }
    return user;
}

const handleLoginAndSignUpResponse = res => {
    if (res.body && res.body.token) {
        LStorage.setItem(AUTH_TOKEN, res.body.token);
    }
    return res.body.user;
};
