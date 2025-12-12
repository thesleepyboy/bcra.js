import {BaseClient} from "../client";

export interface Entidad {
    codigoEntidad: number;
    denominacion?: string;
}

export class Entidades {
    constructor(
        private readonly client: BaseClient
    ) {
        this.client = client;
    }

    public async getEntidadesAsync(): Promise<Entidad[]> {
        const endpoint = "cheques/v1.0/entidades";
        const response = await this.client.get<Entidad>(endpoint);

        return response.results;
    }
}