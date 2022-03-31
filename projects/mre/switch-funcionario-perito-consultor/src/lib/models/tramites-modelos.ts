export interface FiltroTramitesPorRol {
    nombreRol: string;
    usuarioId: string;
    numeroRegistros: number;
    paginaActual: number;
    ordenColumna: string | null;
    ordenForma: string | null;
    filtro: string | null;
}

export interface RespuestaFiltroTramitePorRol {
    paginaActual: number;
    registrosPorPagina: number;
    totalRegistros: number;
    totalPaginas: number;
    resultado: any[];
}