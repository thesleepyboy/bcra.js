import fs from "node:fs";
import path from "node:path";
import url from "node:url"
import https from "https";
import axios from "axios"

import type { AxiosInstance } from "axios";
import { HttpException } from "./httpException.js";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export default abstract class BaseClient {
    protected readonly axiosInstance: AxiosInstance;
    private readonly baseUrl: string = "https://api.bcra.gob.ar/";
    private readonly httpsAgent = new https.Agent({
        ca: fs.readFileSync(path.join(__dirname, "..", "cert", "bcra.gob.ar.crt"))
    });

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
            const response = await this.axiosInstance.get(endpoint, { params: queryParams, httpsAgent: this.httpsAgent });

            return response.data;

        } catch (error) {
            const e = this.buildErrorResponse(error);
            throw e;
        }
    }
    private buildErrorResponse(error: unknown): HttpException {
        if (axios.isAxiosError(error) && error.response) {
            return new HttpException(
                error.response,
                error.status,
                { cause: error.cause }
            );
        }

        if (error instanceof Error) {
            return new HttpException(error.message);
        }

        return new HttpException("Unknown error.", 500, { cause: error });
    }
}