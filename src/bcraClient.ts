import {BaseClient} from "./client";
import {
    Cheques,
    Cotizaciones,
    Deudas,
    Entidades,
    Divisas, Metodologia,
    Metodologias,
    Monetaria,
    Monetarias,
    Divisa,
    Entidad,
    Cheque,
    CotizacionesFecha,
    ChequeRechazado,
    Deuda,
    HistorialDeuda
} from "./endpoints";

export type Encoding = "gzip" | "br";
export type Language = "es-AR" | "en-US";

export class BcraClient {
    private readonly client = new BaseClient();
    private readonly headers: Record<string, string | undefined>;

    constructor(
        private readonly acceptEncoding?: Encoding,
        private readonly acceptLanguage?: Language
    ) {
        this.headers = {
            "Accept-Encoding": acceptEncoding,
            "Accept-Language": acceptLanguage
        }

        Object.assign(this.client.axiosInstance.defaults.headers.get, this.headers);
    }

    private readonly monetarias = new Monetarias(this.client);
    private readonly metodologias = new Metodologias(this.client);
    private readonly divisas = new Divisas(this.client);
    private readonly entidades = new Entidades(this.client);
    private readonly deudas = new Deudas(this.client);
    private readonly cotizaciones = new Cotizaciones(this.client);
    private readonly cheques = new Cheques(this.client);

    public async getPrincipalesVariablesAsync(idVariable?: number, queryParams?: Record<string, any>): Promise<Monetaria[]> {
        return await this.monetarias.getPrincipalesVariablesAsync(idVariable, queryParams);
    }

    public async getMetodologiasAsync(idVariable?: number, queryParams?: Record<string, any>): Promise<Metodologia[]> {
        return await this.metodologias.getMetodologiasAsync(idVariable, queryParams);
    }

    public async getDivisasAsync(): Promise<Divisa[]> {
        return await this.divisas.getDivisasAsync();
    }

    public async getEntidadAsync(): Promise<Entidad[]> {
        return await this.entidades.getEntidadesAsync();
    }

    public async getChequeAsync(codigoEntidad: number, numeroCheque: number): Promise<Cheque[]> {
        return await this.cheques.getChequeAsync(codigoEntidad, numeroCheque);
    }

    public async getChequeRechazadoAsync(identificacion: number): Promise<ChequeRechazado[]> {
        return await this.cheques.getChequeRechazadoAsync(identificacion);
    }

    public async getCotizacionesAsync(codMoneda?: string, queryParams?: Record<string, any>): Promise<CotizacionesFecha[]> {
        return await this.cotizaciones.getCotizacionesAsync(codMoneda, queryParams);
    }

    public async getDeudasAsync(identificacion: number): Promise<Deuda[]> {
        return await this.deudas.getDeudasAsync(identificacion);
    }

    public async getDeudasHistoricasAsync(identificacion: number): Promise<HistorialDeuda[]> {
        return await this.deudas.getDeudasHistoricasAsync(identificacion);
    }
}