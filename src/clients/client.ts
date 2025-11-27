import * as Endpoints from "../endpoints/index.js";
import BaseClient from "./baseClient.js";

interface HeaderOptions {
    "Accept-Encoding"?: string;
    "Accept-Language"?: string;
}

const ACCEPT_ENCODING_OPTIONS = ["gzip", "br"];
const ACCEPT_LANGUAGE_OPTIONS = ["es-AR", "en-US"];

export class BcraClient extends BaseClient {
    public monetarias = new Endpoints.MonetariasEndpoint(this);
    public metodologias = new Endpoints.MetodologiasEndpoints(this);

    public setGlobalHeaders(headers: HeaderOptions): void {
        if (headers["Accept-Encoding"] && !ACCEPT_ENCODING_OPTIONS.includes(headers["Accept-Encoding"])) {
            throw new Error("Invalid headers. Did you mean 'gzip' or 'br'?");
        }
        if (headers["Accept-Language"] && !ACCEPT_LANGUAGE_OPTIONS.includes(headers["Accept-Language"])) {
            throw new Error("Invalid headers. Did you mean 'es-AR' or 'en-US'?");
        }

        Object.assign(this.axiosInstance.defaults.headers.get, headers);
    }
}