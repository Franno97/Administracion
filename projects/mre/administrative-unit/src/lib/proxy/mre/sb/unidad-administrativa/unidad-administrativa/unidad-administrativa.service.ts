import type { ActualizarUnidadAdministrativaServicioDto, AgregarFuncionarioDto, CrearActualizarUnidadAdministrativaDto, CrearSignatarioDto, CrearUnidadAdministrativaServicioDto, GetUnidadAdministrativaInput, GetUnidadAdministrativaServicioInput, ObtenerSignatarioInput, SignatarioDto, UnidadAdministrativaDto, UnidadAdministrativaFuncionalDto, UnidadAdministrativaInfoDto, UnidadAdministrativaServicioDto } from './models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ServicioDto } from '../servicio/models';

@Injectable({
  providedIn: 'root',
})
export class UnidadAdministrativaService {
  apiName = 'UnidadAdministrativa';

  actualizarServicio = (unidadAdministrativaId: string, servicioId: string, input: ActualizarUnidadAdministrativaServicioDto) =>
    this.restService.request<any, UnidadAdministrativaServicioDto>({
      method: 'PUT',
      url: `/api/unidad-administrativa/unidad-administrativa/${unidadAdministrativaId}/servicio/${servicioId}`,
      body: input,
    },
    { apiName: this.apiName });

  agregarFuncional = (unidadAdministrativaId: string, input: AgregarFuncionarioDto) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/unidad-administrativa/unidad-administrativa/${unidadAdministrativaId}/funcionario`,
      body: input,
    },
    { apiName: this.apiName });

  agregarServicio = (unidadAdministrativaId: string, input: CrearUnidadAdministrativaServicioDto) =>
    this.restService.request<any, UnidadAdministrativaServicioDto>({
      method: 'POST',
      url: `/api/unidad-administrativa/unidad-administrativa/${unidadAdministrativaId}/servicio`,
      body: input,
    },
    { apiName: this.apiName });

  agregarSignatario = (unidadAdministrativaId: string, input: CrearSignatarioDto) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/unidad-administrativa/unidad-administrativa/${unidadAdministrativaId}/signatario`,
      body: input,
    },
    { apiName: this.apiName });

  assignMissionChief = (unidadAdministrativaId: string, userId: string) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/unidad-administrativa/unidad-administrativa/${unidadAdministrativaId}/${userId}`,
    },
    { apiName: this.apiName });

  buscarSignatarios = (unidadAdministrativaId: string, input: ObtenerSignatarioInput) =>
    this.restService.request<any, ListResultDto<SignatarioDto>>({
      method: 'GET',
      url: `/api/unidad-administrativa/unidad-administrativa/${unidadAdministrativaId}/signatario/buscar`,
      params: { servicioId: input.servicioId, usuarioId: input.usuarioId, poseeFirmaElectronica: input.poseeFirmaElectronica },
    },
    { apiName: this.apiName });

  cambiarEstado = (unidadAdministrativaId: string, isActive: boolean) =>
    this.restService.request<any, void>({
      method: 'PATCH',
      url: `/api/unidad-administrativa/unidad-administrativa/${unidadAdministrativaId}/state/${isActive}`,
    },
    { apiName: this.apiName });

  create = (input: CrearActualizarUnidadAdministrativaDto) =>
    this.restService.request<any, UnidadAdministrativaDto>({
      method: 'POST',
      url: '/api/unidad-administrativa/unidad-administrativa',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/unidad-administrativa/unidad-administrativa/${id}`,
    },
    { apiName: this.apiName });

  eliminarFuncional = (unidadAdministrativaId: string, userId: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/unidad-administrativa/unidad-administrativa/${unidadAdministrativaId}/funcionario/${userId}`,
    },
    { apiName: this.apiName });

  eliminarServicio = (unidadAdministrativaId: string, servicioId: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/unidad-administrativa/unidad-administrativa/${unidadAdministrativaId}/servicio/${servicioId}`,
    },
    { apiName: this.apiName });

  eliminarSignatario = (unidadAdministrativaId: string, userId: string, servicioId: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/unidad-administrativa/unidad-administrativa/${unidadAdministrativaId}/signatario/usuario/${userId}/servicio/${servicioId}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, UnidadAdministrativaDto>({
      method: 'GET',
      url: `/api/unidad-administrativa/unidad-administrativa/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: GetUnidadAdministrativaInput) =>
    this.restService.request<any, PagedResultDto<UnidadAdministrativaDto>>({
      method: 'GET',
      url: '/api/unidad-administrativa/unidad-administrativa',
      params: { filter: input.filter, tipoUnidadAdministrativaId: input.tipoUnidadAdministrativaId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  getLookup = (unidadAdministrativaId: string) =>
    this.restService.request<any, ListResultDto<ServicioDto>>({
      method: 'GET',
      url: `/api/unidad-administrativa/unidad-administrativa/${unidadAdministrativaId}/route`,
    },
    { apiName: this.apiName });

  getLookupAdministrativeUnit = () =>
    this.restService.request<any, ListResultDto<UnidadAdministrativaInfoDto>>({
      method: 'GET',
      url: '/api/unidad-administrativa/unidad-administrativa/lookup',
    },
    { apiName: this.apiName });

  obtenerFuncionales = (unidadAdministrativaId: string) =>
    this.restService.request<any, PagedResultDto<UnidadAdministrativaFuncionalDto>>({
      method: 'GET',
      url: `/api/unidad-administrativa/unidad-administrativa/${unidadAdministrativaId}/funcionario`,
    },
    { apiName: this.apiName });

  obtenerPorListaIdsByIds = (ids: string[]) =>
    this.restService.request<any, ListResultDto<UnidadAdministrativaInfoDto>>({
      method: 'GET',
      url: '/api/unidad-administrativa/unidad-administrativa/listaIds',
      params: { ids },
    },
    { apiName: this.apiName });

  obtenerServicio = (unidadAdministrativaId: string, servicioId: string) =>
    this.restService.request<any, UnidadAdministrativaServicioDto>({
      method: 'GET',
      url: `/api/unidad-administrativa/unidad-administrativa/${unidadAdministrativaId}/servicio/${servicioId}`,
    },
    { apiName: this.apiName });

  obtenerServicios = (unidadAdministrativaId: string, input: GetUnidadAdministrativaServicioInput) =>
    this.restService.request<any, PagedResultDto<UnidadAdministrativaServicioDto>>({
      method: 'GET',
      url: `/api/unidad-administrativa/unidad-administrativa/${unidadAdministrativaId}/servicio`,
      params: { activo: input.activo, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  obtenerServiciosPorTipoDeServicio = (administrativeUnitId: string, tipoServicioId: string) =>
    this.restService.request<any, ListResultDto<ServicioDto>>({
      method: 'GET',
      url: `/api/unidad-administrativa/unidad-administrativa/${administrativeUnitId}/tiposervicio/${tipoServicioId}`,
    },
    { apiName: this.apiName });

  obtenerServiciosPorUnidadAdministrativaByUnidadAdministrativaId = (unidadAdministrativaId: string) =>
    this.restService.request<any, ListResultDto<ServicioDto>>({
      method: 'GET',
      url: `/api/unidad-administrativa/unidad-administrativa/${unidadAdministrativaId}/servicio-todo`,
    },
    { apiName: this.apiName });

  obtenerSignatarios = (unidadAdministrativaId: string) =>
    this.restService.request<any, PagedResultDto<SignatarioDto>>({
      method: 'GET',
      url: `/api/unidad-administrativa/unidad-administrativa/${unidadAdministrativaId}/signatario`,
    },
    { apiName: this.apiName });

  obtenerUnidadAdministrativaPorCiudadJurisdiccion = (ciudad: string) =>
    this.restService.request<any, ListResultDto<UnidadAdministrativaInfoDto>>({
      method: 'GET',
      url: `/api/unidad-administrativa/unidad-administrativa/jurisdiccion/${ciudad}`,
    },
    { apiName: this.apiName });

  obtenerUnidadAdministrativaPorServicio = (servicioId: string) =>
    this.restService.request<any, ListResultDto<UnidadAdministrativaInfoDto>>({
      method: 'GET',
      url: `/api/unidad-administrativa/unidad-administrativa/servicio/${servicioId}`,
    },
    { apiName: this.apiName });

  obtenerUnidadAdministrativaPorServicioPais = (servicioId: string, codigoPais: string) =>
    this.restService.request<any, ListResultDto<UnidadAdministrativaInfoDto>>({
      method: 'GET',
      url: `/api/unidad-administrativa/unidad-administrativa/servicio/${servicioId}/pais/${codigoPais}`,
    },
    { apiName: this.apiName });

  obtenerUnidadAdminsitrativaPorPais = (codigoPais: string) =>
    this.restService.request<any, ListResultDto<UnidadAdministrativaInfoDto>>({
      method: 'GET',
      url: `/api/unidad-administrativa/unidad-administrativa/pais/${codigoPais}`,
    },
    { apiName: this.apiName });

  update = (id: string, input: CrearActualizarUnidadAdministrativaDto) =>
    this.restService.request<any, UnidadAdministrativaDto>({
      method: 'PUT',
      url: `/api/unidad-administrativa/unidad-administrativa/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
