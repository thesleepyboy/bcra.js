import type { Metadata } from "./metadata.js";

export interface ApiResponse<T> {
    status: number;
    metadata: Metadata;
    results?: T[];
}