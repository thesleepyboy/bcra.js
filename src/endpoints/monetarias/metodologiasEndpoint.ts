import type BaseClient from "../../clients/baseClient.js";
import * as Schemas from "../../schemas/index.js";
import type { IMetodologiasEndpoint } from "../interfaces/IMetodologiasEndpoint.js";

export class MetodologiasEndpoints implements IMetodologiasEndpoint {
    private readonly client: BaseClient;

    constructor(client: BaseClient) {
        this.client = client;
    }

    /**
     * 
     * @param {number} [idVariable] - id of the variable's `Metodologia`. Optional parameter.
     * @param {Schemas.MetodologiaParameters} [queryParams] - Optional parameters.
     * @returns {Promise<Schemas.Metodologia[]>} `Metodología` array
     * 
     * @description
     * This function gets all the available `Metodologías`. You can choose which one to get by specifying the `idVariable` parameter.
     */

    public async getMetodologiasAsync(
        idVariable?: number,
        queryParams?: Schemas.MetodologiaParameters
    ): Promise<Schemas.Metodologia[]> {
        const data = await this.client.get<Schemas.ApiResponse<Schemas.Metodologia>, Schemas.MetodologiaParameters>(
            idVariable 
                ? `estadisticas/v4.0/Metodologia/${idVariable}`
                : "estadisticas/v4.0/Metodologia/",
            queryParams
        )

        return data.results ?? [];
    }
}