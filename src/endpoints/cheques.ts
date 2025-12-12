import {BaseClient} from "../client";

interface ChequeDetalle {
    sucursal: number;
    numeroCuenta: number;
    causal?: string;
}

interface ChequeEntidad {
    entidad?: number;
    detalle?: ChequeDetalle[];
}

interface ChequeCausal {
    causal?: string;
    entidades?: ChequeEntidad[];
}

export interface Cheque {
    numeroCheque: number;
    denunciado: boolean;
    fechaProcesamiento: string;
    denominacionEntidad?: string;
    detalles: ChequeDetalle[];
}

export interface ChequeRechazado {
    identificacion: number;
    denominacion?: string;
    causales?: ChequeCausal[];
}

export class Cheques {
    constructor(
        private readonly client: BaseClient
    ) {
        this.client = client;
    }

    public async getChequeAsync(codigoEntidad: number, numeroCheque: number): Promise<Cheque[]> {
        const endpoint = `cheques/v1.0/denunciados/${codigoEntidad}/${numeroCheque}`;
        const response = await this.client.get<Cheque>(endpoint);

        return response.results;
    }

    public async getChequeRechazadoAsync(identificacion: number): Promise<ChequeRechazado[]> {
        const endpoint = `centraldedeudores/v1.0/Deudas/ChequesRechazados/${identificacion}`;
        const response = await this.client.get<ChequeRechazado>(endpoint);

        return response.results;
    }
}