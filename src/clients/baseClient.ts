import axios from "axios"
import type { AxiosInstance } from "axios";
import HttpException from "./httpException.js";

export default abstract class BaseClient {
    protected readonly axiosInstance: AxiosInstance;
    private readonly baseUrl: string = "https://api.bcra.gob.ar/";

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: this.baseUrl,
            timeout: 2500
        });
    }

    public async get<TResponse, TParams>(
        endpoint: string,
        queryParams?: TParams
    ): Promise<TResponse> {
        try {
            const response = await this.axiosInstance.get(endpoint, { params: queryParams });

            return response.data;

        } catch (error) {
            const e = this.buildErrorResponse(error);
            throw e;
        }
    }
    private buildErrorResponse(error: unknown): HttpException | Error {
        if (axios.isAxiosError(error) && error.response) {
            return new HttpException(
                error.response,
                error.status,
                { cause: error.cause }
            );
        }

        if (error instanceof Error) {
            return new Error(error.message);
        }

        return new HttpException("Unknown error.", 500, { cause: error });
    }
}