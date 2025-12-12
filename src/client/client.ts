import {ApiResponse} from "./baseClient";

export interface Client {
    get<R>(url: string, queryParams?: any): Promise<ApiResponse<R>>;
    // add POST later
}