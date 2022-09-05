import { ErrorResponse } from '~/services';

export class User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    fullName?: string;
    avatar?: string;
    createdAt: string;
    roles: string[];

    static getShortName(firstName: string | undefined, lastname: string | undefined): string {
        if (!firstName || !lastname) return '';
        return firstName[0].toUpperCase() + lastname[0].toUpperCase();
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
