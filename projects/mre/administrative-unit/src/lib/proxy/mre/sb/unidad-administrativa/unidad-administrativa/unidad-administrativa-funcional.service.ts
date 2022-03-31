import type { FuncionarioInfoDto, FuncionarioInfoExtendido, UnidadAdministrativaInfoDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UnidadAdministrativaFuncionalService {
  apiName = 'UnidadAdministrativa';

  obtenerFuncionarioPorUsuarioId = (usuarioId: string) =>
    this.restService.request<any, FuncionarioInfoExtendido>({
      method: 'GET',
      url: `/api/unidad-administrativa/unidad-administrativa-funcional/funcionario/${usuarioId}`,
    },
    { apiName: this.apiName });

  obtenerFuncionariosPorUnidadAdministrativa = (unidadAdministrativaId: string) =>
    this.restService.request<any, PagedResultDto<FuncionarioInfoDto>>({
      method: 'GET',
      url: `/api/unidad-administrativa/unidad-administrativa-funcional/funcionarios/${unidadAdministrativaId}`,
    },
    { apiName: this.apiName });

  obtenerUnidadAdministrativaDelFuncional = (usuarioId: string) =>
    this.restService.request<any, UnidadAdministrativaInfoDto>({
      method: 'GET',
      url: '/api/unidad-administrativa/unidad-administrativa-funcional',
      params: { usuarioId },
    },
    { apiName: this.apiName });

  obtenerUnidadAdministrativaDelFuncionalActual = () =>
    this.restService.request<any, UnidadAdministrativaInfoDto>({
      method: 'GET',
      url: '/api/unidad-administrativa/unidad-administrativa-funcional/actual',
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
