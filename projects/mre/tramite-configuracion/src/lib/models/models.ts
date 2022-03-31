import { PaginadoRequest, PaginadoYOrdenadoRequest } from "@mre/comunes";


export interface ConfiguracionFirmaElectronicaResponse {
  id: string;
  servicioId: string;
  servicioNombre: string;
  tipoDocumentoCodigo: string;
  modeloFirma: string;
  tamanioFirma: number;
  posicionX: number;
  posicionY: number;
  numeroPagina: number;
}



export interface ObtenerListaConfiguracionFirmaElectronicaRequest extends PaginadoYOrdenadoRequest {
  servicioId: string | null;
  tipoDocumentoCodigo: string;
}

export interface CrearConfiguracionFirmaElectronicaRequest {
  servicioId: string;
  servicioNombre: string;
  tipoDocumentoCodigo: string;
  modeloFirma: string;
  tamanioFirma: number;
  posicionX: number;
  posicionY: number;
  numeroPagina: number;
}

export interface ActualizarConfiguracionFirmaElectronicaRequest {
  id: string;
  servicioId: string;
  servicioNombre: string;
  tipoDocumentoCodigo: string;
  modeloFirma: string;
  tamanioFirma: number;
  posicionX: number;
  posicionY: number;
  numeroPagina: number;
}