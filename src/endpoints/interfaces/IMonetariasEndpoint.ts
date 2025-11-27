import type * as Schemas from "../../schemas/index.js";

export interface IMonetariasEndpoint {
    getPrincipalesVariablesKeysAsync(): Promise<string[]>;
    getPrincipalesVariablesAsync(queryParams?: Schemas.MonetariasParameters): Promise<Record<string, Schemas.Monetarias>>;
    getVariablesMonetariasAsync(idVariable: number, queryParams?: Schemas.DatosMonetariasParameters): Promise<Schemas.DatosMonetaria[]>;
}