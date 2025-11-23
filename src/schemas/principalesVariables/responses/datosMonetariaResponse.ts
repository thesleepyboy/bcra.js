import type { Metadata } from "../../metadata.js";
import type { DatosMonetaria } from "../datosMonetaria.js";

export interface DatosMonetariaResponse {
    status: number;
    metadata: Metadata;
    results?: DatosMonetaria[];
}