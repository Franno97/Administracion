import type { ConfigurarFirmaElectronicaInput, EliminarFirmaSignatarioDto } from './models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { IFormFile } from '../../../../microsoft/asp-net-core/http/models';
import type { IActionResult } from '../../../../microsoft/asp-net-core/mvc/models';

@Injectable({
  providedIn: 'root',
})
export class ConfigurarFirmaElectronicaService {
  apiName = 'UnidadAdministrativa';

  agregar = (archivoFirma: IFormFile, claveFirma: string) =>
    this.restService.request<any, boolean>({
      method: 'PUT',
      url: '/api/unidad-administrativa/configurar-firma-electronica',
    },
    { apiName: this.apiName });

  eliminar = () =>
    this.restService.request<any, boolean>({
      method: 'DELETE',
      url: '/api/unidad-administrativa/configurar-firma-electronica',
    },
    { apiName: this.apiName });

  eliminarFirmaSignatario = (input: EliminarFirmaSignatarioDto) =>
    this.restService.request<any, boolean>({
      method: 'DELETE',
      url: '/api/unidad-administrativa/configurar-firma-electronica/eliminar-firma-usuario',
      params: { unidadAdministrativaId: input.unidadAdministrativaId, usuarioId: input.usuarioId, servicioId: input.servicioId },
    },
    { apiName: this.apiName });

  esPermitida = () =>
    this.restService.request<any, boolean>({
      method: 'GET',
      url: '/api/unidad-administrativa/configurar-firma-electronica/permitida',
    },
    { apiName: this.apiName });

  existe = () =>
    this.restService.request<any, boolean>({
      method: 'GET',
      url: '/api/unidad-administrativa/configurar-firma-electronica/existe',
    },
    { apiName: this.apiName });

  obtener = (input: ConfigurarFirmaElectronicaInput) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: '/api/unidad-administrativa/configurar-firma-electronica',
      params: { usuarioId: input.usuarioId },
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
