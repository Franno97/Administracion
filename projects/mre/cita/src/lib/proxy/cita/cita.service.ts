import type { CitaDto, CrearCitaSalida, CreateUpdateCitaDto, GetCitaInput, ObtenerCitaEntrada, ReagendarCitaDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CitaService {
  apiName = 'Cita';

  agendarByEntrada = (entrada: CreateUpdateCitaDto) =>
    this.restService.request<any, CrearCitaSalida>({
      method: 'POST',
      url: '/api/cita/cita/agendar',
      body: entrada,
    },
    { apiName: this.apiName });

  cancelarById = (id: string) =>
    this.restService.request<any, CitaDto>({
      method: 'PUT',
      url: `/api/cita/cita/Cancelar/${id}`,
    },
    { apiName: this.apiName });

  create = (entrada: CreateUpdateCitaDto) =>
    this.restService.request<any, CitaDto>({
      method: 'POST',
      url: '/api/cita/cita',
      body: entrada,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/cita/cita/${id}`,
    },
    { apiName: this.apiName });

  existeCitaAgendadaByEntrada = (entrada: CreateUpdateCitaDto) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: '/api/cita/cita/existeCitaAgendada',
      body: entrada,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, CitaDto>({
      method: 'GET',
      url: `/api/cita/cita/${id}`,
    },
    { apiName: this.apiName });

  getList = (entrada: GetCitaInput) =>
    this.restService.request<any, PagedResultDto<CitaDto>>({
      method: 'GET',
      url: '/api/cita/cita',
      params: { filter: entrada.filter, personaId: entrada.personaId, sorting: entrada.sorting, skipCount: entrada.skipCount, maxResultCount: entrada.maxResultCount },
    },
    { apiName: this.apiName });

  obtenerPorServicioUnidadAdministrativaByEntrada = (entrada: ObtenerCitaEntrada) =>
    this.restService.request<any, CitaDto[]>({
      method: 'GET',
      url: '/api/cita/cita/servicioUnidadAdministrativa',
      params: { unidadAdministrativaId: entrada.unidadAdministrativaId, servicioId: entrada.servicioId, fecha: entrada.fecha },
    },
    { apiName: this.apiName });

  reagendarByEntrada = (entrada: ReagendarCitaDto) =>
    this.restService.request<any, CitaDto>({
      method: 'PUT',
      url: '/api/cita/cita/reagendar',
      body: entrada,
    },
    { apiName: this.apiName });

  update = (id: string, entrada: CreateUpdateCitaDto) =>
    this.restService.request<any, CitaDto>({
      method: 'PUT',
      url: `/api/cita/cita/${id}`,
      body: entrada,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
