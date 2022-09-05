import { User } from '~/models';
import { ErrorResponse } from '..';

export interface AuthSignInInput {
    email: string;
    password: string;
}

export interface AuthSignUpInput {
    // firstName: string;
    // lastName: string;
    name: string;
    email: string;
    password: string;
}

export interface LoginResponse extends ErrorResponse {
    token?: string;
    user: User;
}

export interface SignedUpResponse extends ErrorResponse {
    token?: string;
    user: User;
}
