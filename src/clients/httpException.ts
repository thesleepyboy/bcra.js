import type { AxiosResponse } from "axios";
import type { ErrorResponse } from "../schemas/errorResponse.js";

const isNumber = (x: any): x is number => typeof x === "number";
const isString = (x: any): x is string => typeof x === "string";

const DEFAULT_ERROR_STATUS = 500;
const DEFAULT_ERROR_CODE = "Internal Server Error";
const DEFAULT_ERROR_MESSAGE = "Something went wrong";

interface HttpErrorOptions {
    cause?: unknown;
}

export default class HttpException extends Error {
    private readonly data: ErrorResponse;

    public readonly status: number;
    public readonly statusCode: string;
    public readonly cause: unknown;

    constructor(
        response: AxiosResponse | string,
        status?: number,
        options?: HttpErrorOptions
    ) {
        super();

        this.data = isString(response) ? null : response.data;

        this.message = this.getMessage();
        this.status = this.getStatus(status);
        this.statusCode = this.getStatusCode(response);
        this.cause = this.getCause(options?.cause);
    }

    private getMessage(): string {
        if (this.data && this.data.errorMessages.length !== 0) {
            return this.data.errorMessages.join(" - ");
        }

        return DEFAULT_ERROR_MESSAGE;
    }

    private getStatus(status?: number): number {
        if (status) {
            return status;
        }

        if (this.data && isNumber(this.data.status)) {
            return this.data.status;
        }

        return DEFAULT_ERROR_STATUS;
    }

    private getStatusCode(response: AxiosResponse | string): string {
        if (isString(response)) {
            return response;
        }

        if (response.statusText) {
            return response.statusText;
        }

        return DEFAULT_ERROR_CODE;
    }

    private getCause(cause?: unknown): unknown {
        if (cause) {
            return cause;
        }

        return undefined;
    }
}