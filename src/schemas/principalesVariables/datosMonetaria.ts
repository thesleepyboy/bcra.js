interface DetalleMonetaria {
    fecha: string;
    valor: number;
}

export interface DatosMonetaria {
    idVariable: number;
    detalle?: DetalleMonetaria[];
}