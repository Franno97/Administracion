export interface MovimientoRequest {
    tramiteId: string;
    estado: number;
    estadoOrigen: number;
    observacionDatosPersonales: string;
    observacionSoportesGestion: string;
    observacionDomicilios: string;
    observacionMovimientoMigratorio: string;
    observacionMultas: string;
    creatorId: string;

    created?: Date;
    diasTranscurridos?: string;
    id?: string;
    nombreRol?: string;
    usuarioId?: string;
    nombreEstado?: string;
    unidadAdministrativaId?: string;
    //-------------------------
    fechaHoraCita?: string;
}
