import type { Metadata } from "../../metadata.js";
import type { Metodologia } from "../metodologia.js";

export interface MetodologiaResponse {
    status: number;
    metadata: Metadata;
    results?: Metodologia[];
}