import { HttpStatusCode } from "@angular/common/http";

export interface ResultadoPaginadoResponse<T> {
  totalRegistros: number;
  items: T[];
}


export interface ApiResponseWrapper<T> {
    errors: string[];
    httpStatusCode: HttpStatusCode;
    message: string;
    result: T;
}

export interface PaginadoRequest {
  maximoResultado: number;
  saltar: number;
}


export interface PaginadoYOrdenadoRequest extends PaginadoRequest {
  orden: string;
}