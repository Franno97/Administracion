export interface SolicitudGenerarVisaPorTramiteId {
    tramiteId: string;
}

export interface RespuestaGenerarVisaPorTramiteId {
    estado: string;
    base64: string;
    mensaje: string;
}