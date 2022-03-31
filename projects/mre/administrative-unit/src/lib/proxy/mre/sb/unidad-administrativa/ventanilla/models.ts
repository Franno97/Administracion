import type { PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CrearActualizarVentanillaDto {
  unidadAdministrativaId: string;
  nombre: string;
  atencionPresencial: boolean;
  atencionVirtual: boolean;
  inicioAtencion?: string;
  finAtencion?: string;
  activo: boolean;
}

export interface GetVentanillaInputDto extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export interface VentanillaDto {
  id?: string;
  administrativeUnitId?: string;
  name?: string;
  isPresentialAttention: boolean;
  isVirtualAttention: boolean;
  attentionStart?: string;
  attentionEnd?: string;
  isActive: boolean;
}
