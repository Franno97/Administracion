import type { AuditableTipo } from './auditable-tipo.enum';
import type { PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface AuditableDto {
  id?: string;
  categoriaId?: string;
  categoria?: string;
  tipo: AuditableTipo;
  item?: string;
}

export interface AuditarBuscarInputDto extends PagedAndSortedResultRequestDto {
  categoriaId?: string;
  filtro?: string;
}

export interface AuditarObjetoBuscarDto {
  tipo: AuditableTipo;
  categoriaId?: string;
  categoria?: string;
  item: string;
  acciones: string[];
}

export interface AuditarObjetoDto {
  tipo: AuditableTipo;
  item: string;
  acciones: string[];
}

export interface CategoriaDto {
  id: string;
  nombre: string;
}

export interface CrearActualizarAuditableDto {
  categoriaId: string;
  tipo: AuditableTipo;
  item: string;
}

export interface ObtenerAuditableInput extends PagedAndSortedResultRequestDto {
  filter?: string;
  categoriaId?: string;
}
