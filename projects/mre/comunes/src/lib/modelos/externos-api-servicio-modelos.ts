export interface SolicitudBuscarVisaPorNumeroServicio {
    numeroVisa: string;
}

export interface RespuestaBuscarVisaPorNumeroServicio {
    codigo: string;
    detalle: string;
    lisDatosVisa: DatosVisa[];
}

export interface DatosVisa {
    estadoVisa: string;
    idPersona: number;
    fechaCaducidad: string;
    fechaConcesion: string;
    idActoConsularVisa: number;
    idCentroAdministrativo: number;
    idTramite: number;
    nombreActoConsularVisa: string;
    nombreCentroAdministrativo: string;
    nombres: string;
    numeroPasaporte: string;
    numeroVisa: string;
    primerApellido: string;
    segundoApellido: string;
}
