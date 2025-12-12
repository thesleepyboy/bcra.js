import {BaseClient} from "../client";

interface CotizacionesDetalle {
    codigoMoneda?: string;
    descripcion?: string;
    tipoPase: number;
    tipoCotizacion: number;
}

export interface CotizacionesFecha {
    fecha?: string;
    detalle: CotizacionesDetalle[];
}

export class Cotizaciones {
    constructor(
        private readonly client: BaseClient
    ) {
        this.client = client;
    }

    public async getCotizacionesAsync(codMoneda?: string, queryParams?: Record<string, any>): Promise<CotizacionesFecha[]> {
        const endpoint = codMoneda ? `estadisticascambiarias/v1.0/Cotizaciones/${codMoneda}` : "estadisticascambiarias/v1.0/Cotizaciones";
        const response = await this.client.get<CotizacionesFecha>(endpoint, queryParams);

        return response.results;
    }
}