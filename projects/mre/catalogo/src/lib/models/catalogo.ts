
export interface Catalogo {
    catalogoCabeceraId: string;
    codigo: string;
    descripcion: string;
    descripcion2: string;
    codigoEsigex: string;
    codigoMdg: string;
    codigoOtro: string;
}

export enum CatalogoCodigos {
    TIPO_DOCUMENTO = "TIPO_DOCUMENTO",
    NACIONALIDAD = "Nacionalidad"
}