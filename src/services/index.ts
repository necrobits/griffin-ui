export * from './user';
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
    nextId?: number;
    previousId?: number;
    total: number;
    results: T[];
}

export interface MessageResponse {
    responseCode?: string;
    message: string;
}
