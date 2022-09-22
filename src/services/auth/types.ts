import { User } from '~/models';
import { ErrorResponse } from '..';

export interface AuthSignInInput {
    email: string;
    password: string;
}

export interface AuthSignUpInput {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    gender: string;
    birthDate: string;
    nationality: string;
    username: string;
    backupEmail: string;
    phoneNumber: string;
    address: {
        street: string;
        post: number;
        city: string;
        country: string;
    };
}

export interface LoginResponse extends ErrorResponse {
    token?: string;
    user: User;
}

export interface SignedUpResponse extends ErrorResponse {
    token?: string;
    user: User;
}
