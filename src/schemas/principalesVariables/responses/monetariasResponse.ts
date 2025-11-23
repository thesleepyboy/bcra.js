import type { Metadata } from "../../metadata.js";
import type { Monetarias } from "../monetarias.js";

export interface MonetariasResponse {
    status: number;
    metadata: Metadata;
    results?: Monetarias[];
}