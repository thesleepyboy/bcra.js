import {Exception} from "./exception";

export enum Status {
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

export class HttpException extends Error implements Exception {
    public readonly statusCode: string;

    constructor(
        public readonly status: number,
        public readonly message: string
    ) {
        super(message);

        this.status = status;
        this.statusCode = Status[status];
        this.name = Status[status];
    }
}