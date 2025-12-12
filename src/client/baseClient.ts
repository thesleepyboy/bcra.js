import https from "node:https";
import fs from "node:fs";
import path from "node:path"

import axios, {AxiosError, AxiosInstance} from "axios";

import {Client} from "./client";
import {HttpException, Status} from "../exceptions";

export interface ApiResponse<R> {
    status: number;
    metadata?: any;
    results: R[];
}

export interface ErrorResponse {
    status: number;
    errorMessages: string[];
}

export const isBcraError = (e: unknown): e is AxiosError<ErrorResponse> => {
    return e instanceof AxiosError &&
        !!e.response &&
        "status" in e.response.data &&
        "errorMessages" in e.response.data;
}

export class BaseClient implements Client {
    public readonly axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: "https://api.bcra.gob.ar/",
            httpsAgent: new https.Agent({
                ca: fs.readFileSync(path.join(__dirname, "..", "cert", "bcra.gob.ar.crt"))
            })
        })
    }

    public async get<R>(url: string, queryParams?: Record<string, any>): Promise<ApiResponse<R>> {
        try {
            const response = await this.axiosInstance.get<ApiResponse<R>>(
                url,
                {params: queryParams}
            )

            return response.data;
        } catch (e: unknown) {
            if (isBcraError(e)) {
                const errorData = e.response!.data;
                throw new HttpException(errorData.status, errorData.errorMessages.toString());
            }

            if (axios.isAxiosError(e)) {
                throw new HttpException(Status.INTERNAL_SERVER_ERROR, e.message);
            }

            throw new HttpException(Status.INTERNAL_SERVER_ERROR, "Unknown error");
        }
    }
}