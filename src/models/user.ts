import { ErrorResponse } from '~/services';

export class User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    backupEmail?: string;
    fullName?: string;
    nationality: string;
    birthDate: string;
    avatar?: string;
    gender: string;
    phoneNumber: string;
    address: {
        street: string;
        post: number;
        city: string;
        country: string;
    };
    roles: string[];
    createdAt: string;
    lastOnline: string;
    isActive: boolean;

    static getShortName(firstName: string | undefined, lastName: string | undefined): string {
        if (!firstName || !lastName) return '';
        return firstName[0].toUpperCase() + lastName[0].toUpperCase();
    }

    static getFullName(user: User): string {
        if (user.fullName) return user.fullName;
        return `${user.firstName} ${user.lastName}`;
    }

    static isAdmin(user: User): boolean {
        return user.roles.includes('Admin');
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
