import { ErrorResponse } from '~/services';

export class User {
    id: number;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    fullName?: string;
    gender: string;
    avatar?: string;
    createdAt: string;
    lastOnline: string;
    roles: string[];
    phone: string;
    isActive: boolean;
    address: {
        street: string;
        post: number;
        city: string;
        country: string;
    };
    birthDate: string;
    nationality: string;

    static getShortName(firstName: string | undefined, lastName: string | undefined): string {
        if (!firstName || !lastName) return '';
        return firstName[0].toUpperCase() + lastName[0].toUpperCase();
    }

    static getFullName(user: User): string {
        if (user.fullName) return user.fullName;
        return `${user.firstName} ${user.lastName}`;
    }
}

export interface UserState {
    currentUser: User | undefined;
    error: ErrorResponse | undefined;
    isAuthing: boolean;
}

export interface UsersState {
    loading: boolean;
    items: User[];
    errors?: string;
}
