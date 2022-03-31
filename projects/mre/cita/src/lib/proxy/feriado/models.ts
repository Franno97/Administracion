import type { PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CreateUpdateFeriadoDto {
  descripcion: string;
  inicio?: string;
  fin?: string;
  unidadAdministrativaCalendarioId: string;
}

export interface FeriadoDto {
  id?: string;
  descripcion?: string;
  inicio?: string;
  inicioTexto?: string;
  fin?: string;
  finTexto?: string;
}

export interface GetFeriadoInput extends PagedAndSortedResultRequestDto {
  filter?: string;
  unidadAdministrativaCalendarioId: string;
}
