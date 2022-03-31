export interface SolicitudGrabarSoporteGestion {
    archivo: any;
    codigoMDG: string;
}

export interface SolicitudObtenerArchivoBase64PorUrl {
    urlArchivo: any;
}

export interface SolicitudGrabarDocumentoZipGestion {
    tramiteId: string;
    archivos: any[];
}