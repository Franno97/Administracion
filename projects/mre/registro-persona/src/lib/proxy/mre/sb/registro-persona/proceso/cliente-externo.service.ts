import type { ConsultarDiscapacidadRespuesta, ConsultarFlujoMigratorioRespuesta, ConsultarMultasRespuesta, ConsultarPagoRespuesta, ConsultarPuntoControlOutput, InformacionPersonaDto } from './models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClienteExternoService {
  apiName = 'RegistroPersona';

  consultarDiscapacidad = (numeroCedula: string) =>
    this.restService.request<any, ConsultarDiscapacidadRespuesta>({
      method: 'GET',
      url: `/api/RegistroPersona/ClienteExterno/discapacidad/${numeroCedula}`,
    },
    { apiName: this.apiName });

  consultarFlujoMigratorio = (numeroRegistro: string) =>
    this.restService.request<any, ConsultarFlujoMigratorioRespuesta>({
      method: 'GET',
      url: `/api/RegistroPersona/ClienteExterno/flujoMigratorio/${numeroRegistro}`,
    },
    { apiName: this.apiName });

  consultarMultas = (numeroRegistro: string) =>
    this.restService.request<any, ConsultarMultasRespuesta>({
      method: 'GET',
      url: `/api/RegistroPersona/ClienteExterno/multas/${numeroRegistro}`,
    },
    { apiName: this.apiName });

  consultarPago = (numeroComprobante: string) =>
    this.restService.request<any, ConsultarPagoRespuesta>({
      method: 'GET',
      url: `/api/RegistroPersona/ClienteExterno/pago/${numeroComprobante}`,
    },
    { apiName: this.apiName });

  consultarPuntoControl = (numeroRegistro: string) =>
    this.restService.request<any, ConsultarPuntoControlOutput>({
      method: 'GET',
      url: `/api/RegistroPersona/ClienteExterno/puntoControl/${numeroRegistro}`,
    },
    { apiName: this.apiName });

  obtenerInformacionPersonaByNumeroRegistro = (numeroRegistro: string) =>
    this.restService.request<any, InformacionPersonaDto>({
      method: 'GET',
      url: `/api/RegistroPersona/ClienteExterno/informacionPersona/${numeroRegistro}`,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
