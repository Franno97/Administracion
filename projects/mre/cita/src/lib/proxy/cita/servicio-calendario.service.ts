import type { CrearActualizarServicioCalendarioDto, ObtenerDisponibilidadEntrada, ObtenerServicioCalendarioEntrada, PeriodoDisponibleDto, ServicioCalendarioDto, ServicioCalendarioLookupDto } from './models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServicioCalendarioService {
  apiName = 'Cita';

  create = (entrada: CrearActualizarServicioCalendarioDto) =>
    this.restService.request<any, ServicioCalendarioDto>({
      method: 'POST',
      url: '/api/cita/servicio-calendario',
      body: entrada,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/cita/servicio-calendario/${id}`,
    },
    { apiName: this.apiName });

  existePorServicioUnidadAdministrativaByEntrada = (entrada: ObtenerServicioCalendarioEntrada) =>
    this.restService.request<any, boolean>({
      method: 'GET',
      url: '/api/cita/servicio-calendario/existe',
      params: { unidadAdministrativaId: entrada.unidadAdministrativaId, servicioId: entrada.servicioId, fecha: entrada.fecha },
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, ServicioCalendarioDto>({
      method: 'GET',
      url: `/api/cita/servicio-calendario/${id}`,
    },
    { apiName: this.apiName });

  getList = (entrada: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<ServicioCalendarioDto>>({
      method: 'GET',
      url: '/api/cita/servicio-calendario',
      params: { skipCount: entrada.skipCount, maxResultCount: entrada.maxResultCount, sorting: entrada.sorting },
    },
    { apiName: this.apiName });

  getLookup = () =>
    this.restService.request<any, ListResultDto<ServicioCalendarioLookupDto>>({
      method: 'GET',
      url: '/api/cita/servicio-calendario/lookup',
    },
    { apiName: this.apiName });

  obtenerPeriodosDisponiblesByEntrada = (entrada: ObtenerDisponibilidadEntrada) =>
    this.restService.request<any, PeriodoDisponibleDto[]>({
      method: 'GET',
      url: '/api/cita/servicio-calendario/disponibilidad',
      params: { unidadAdministrativaId: entrada.unidadAdministrativaId, servicioId: entrada.servicioId, fecha: entrada.fecha },
    },
    { apiName: this.apiName });

  obtenerPorServicioUnidadAdministrativaByEntrada = (entrada: ObtenerServicioCalendarioEntrada) =>
    this.restService.request<any, ServicioCalendarioDto[]>({
      method: 'GET',
      url: '/api/cita/servicio-calendario/servicioUnidadAdministrativa',
      params: { unidadAdministrativaId: entrada.unidadAdministrativaId, servicioId: entrada.servicioId, fecha: entrada.fecha },
    },
    { apiName: this.apiName });

  update = (id: string, entrada: CrearActualizarServicioCalendarioDto) =>
    this.restService.request<any, ServicioCalendarioDto>({
      method: 'PUT',
      url: `/api/cita/servicio-calendario/${id}`,
      body: entrada,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
