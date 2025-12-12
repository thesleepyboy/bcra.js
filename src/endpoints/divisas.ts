import {BaseClient} from "../client";

export interface Divisa {
    codigo?: string;
    denominacion?: string;
}

export class Divisas {
    constructor(
        private readonly client: BaseClient
    ) {
        this.client = client;
    }

    public async getDivisasAsync(): Promise<Divisa[]> {
        const endpoint = "estadisticascambiarias/v1.0/Maestros/Divisas";
        const response = await this.client.get<Divisa>(endpoint);

        return response.results;
    }
}