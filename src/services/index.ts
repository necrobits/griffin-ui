export * from './users/user';
export * from './auth';

export type BaseFilterParams = {
    page?: number;
    pageSize?: number;
    name?: string;
    sortBy?: string;
    filterBy?: string;
};

export class ErrorResponse {
    readonly statusCode?: number;
    readonly message?: string;

    constructor(error?: Partial<ErrorResponse>) {
        this.statusCode = error?.statusCode;
        this.message = error?.message;
    }
}

export interface RequestResponse<T> {
    pagination: {
        first: number;
        last: number;
        prev: number | undefined;
        next: number | undefined;
    };
    total: number;
    results: T[];
}

export interface MessageResponse {
    responseCode?: string;
    message: string;
}
