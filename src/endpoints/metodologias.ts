import {BaseClient} from "../client";

export interface Metodologia {
    id: number;
    detalle?: string;
}

export class Metodologias {
    constructor(
        private readonly client: BaseClient
    ) {
        this.client = client;
    }

    public async getMetodologiasAsync(idVariable?: number, queryParams?: Record<string, any>): Promise<Metodologia[]> {
        const endpoint = idVariable ? `estadisticas/v4.0/metodologia/${idVariable}` : "estadisticas/v4.0/metodologia";
        const response = await this.client.get<Metodologia>(endpoint, queryParams);

        return response.results;
    }
}