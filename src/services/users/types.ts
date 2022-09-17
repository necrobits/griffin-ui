import { User } from '~/models';

export interface PatchUserInput {
    userId: number;
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    backupEmail?: string;
    nationality?: string;
    birthDate?: string;
    avatar?: string;
    gender?: string;
    phoneNumber?: string;
    address?: {
        street: string;
        post: number;
        city: string;
        country: string;
    };
    roles?: string[];
}

export interface ChangePasswordInput {
    userId: number;
    oldPwd: string;
    newPwd: string;
}
