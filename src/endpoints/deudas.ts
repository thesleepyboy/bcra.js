import {BaseClient} from "../client";

interface DeudaEntidad {
    entidad?: string;
    situacion?: number;
    fechaSit1?: string;
    monto?: number;
    diasAtrasoPago?: number;
    refinanciaciones: boolean;
    recategorizacionOblig: boolean;
    situacionJuridica: boolean;
    irrecDisposicionTecnica: boolean;
    enRevision: boolean;
    procesoJud: boolean;
}

interface HistorialEntidad {
    entidad?: string;
    situacion?: number;
    monto?: number;
    enRevision: boolean;
    procesoJud: boolean;
}

interface DeudaPeriodo {
    periodo?: string;
    entidades: DeudaEntidad[];
}

interface HistorialPeriodo {
    periodo?: string;
    entidades: HistorialEntidad[];
}

export interface Deuda {
    identificacion: number;
    denominacion?: string;
    periodos?: DeudaPeriodo[];
}

export interface HistorialDeuda {
    identificacion: number;
    denominacion?: string;
    periodos?: HistorialPeriodo[];
}

export class Deudas {
    constructor(
        private readonly client: BaseClient
    ) {
        this.client = client;
    }

    public async getDeudasAsync(identificacion: number): Promise<Deuda[]> {
        const endpoint = `centraldedeudores/v1.0/Deudas/${identificacion}`;
        const response = await this.client.get<Deuda>(endpoint);

        return response.results;
    }

    public async getDeudasHistoricasAsync(identificacion: number): Promise<HistorialDeuda[]> {
        const endpoint = `centraldedeudores/v1.0/Deudas/Historicas/${identificacion}`;
        const response = await this.client.get<HistorialDeuda>(endpoint);

        return response.results;
    }
}