import type * as Schemas from "../../schemas/index.js";

export interface IMetodologiasEndpoint {
    getMetodologiasAsync(idVariable?: number, queryParams?: Schemas.MetodologiaParameters): Promise<Schemas.Metodologia[]>;
}