import type BaseClient from "../../clients/baseClient.js";
import type { IMonetariasEndpoint } from "../interfaces/IMonetariasEndpoint.js";
import type * as Schemas from "../../schemas/index.js";

export class MonetariasEndpoint implements IMonetariasEndpoint {
    private readonly client: BaseClient;

    constructor(client: BaseClient) {
        this.client = client;
    }

    /**
     * 
     * @returns {Promise<string[]>} `Principales variables` keys
     */
    public async getPrincipalesVariablesKeysAsync(): Promise<string[]> {
        const data = await this.getPrincipalesVariablesAsync();
        return Object.keys(data);
    }

    /**
     * 
     * @param {Schemas.MonetariasParameters} queryParams - Optional parameters.
     * @returns {Promise<Record<string, Schemas.Monetarias>>} - `Principales variables`
     */

    public async getPrincipalesVariablesAsync(
        queryParams?: Schemas.MonetariasParameters
    ): Promise<Record<string, Schemas.Monetarias>> {
        const data = await this.client.get<Schemas.ApiResponse<Schemas.Monetarias>, Schemas.MonetariasParameters>(
            "estadisticas/v4.0/monetarias", 
            queryParams
        );

        const principalesVariables: Record<string, Schemas.Monetarias> = {};

        data.results?.forEach((result) => {
            if (!result.descripcion) return;

            const key = result.descripcion
                .replace(/\s+/g, '_')
                .toLowerCase()
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "");

            principalesVariables[key!] = result;
        });

        return principalesVariables;
    }

    /**
     * 
     * @param {number} idVariable - id of the variable
     * @param {Schemas.DatosMonetariasParameters} [queryParams] - Optional parameters.
     * @returns {Promise<Schemas.DatosMonetaria[]>} `Variables monetarias`
     */
    public async getVariablesMonetariasAsync(
        idVariable: number, 
        queryParams?: Schemas.DatosMonetariasParameters
    ): Promise<Schemas.DatosMonetaria[]> {
        const data = await this.client.get<Schemas.ApiResponse<Schemas.DatosMonetaria>, Schemas.DatosMonetariasParameters>(
            `estadisticas/v4.0/monetarias/${idVariable}`,
            queryParams
        );

        return data.results ?? [];
    }
}