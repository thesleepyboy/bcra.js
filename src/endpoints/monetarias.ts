import {BaseClient} from "../client";

export interface Monetaria {
    idVariable: number;
    descripcion?: string;
    categoria?: string;
    tipoSerie?: string;
    periodicidad?: string;
    unidadExpresion?: string;
    moneda?: string;
    primerFechaInformada?: string;
    ultFechaInformada?: string;
    ultValorInformado?: number;
}

export class Monetarias {
    constructor(
        private readonly client: BaseClient
    ) {
        this.client = client;
    }

    public async getPrincipalesVariablesAsync(idVariable?: number, queryParams?: Record<string, any>): Promise<Monetaria[]> {
        const endpoint = idVariable ? `estadisticas/v4.0/monetarias/${idVariable}` : "estadisticas/v4.0/monetarias";
        const response = await this.client.get<Monetaria>(endpoint, queryParams);

        return response.results;
    }
}