import type { EstadoCita } from '../estado-cita.enum';
import type { PlanSemanal } from '../models';
import type { EntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CitaDto {
  id?: string;
  unidadAdministrativaId?: string;
  unidadAdministrativaNombre?: string;
  servicioId?: string;
  servicioNombre?: string;
  personaId?: string;
  funcionarioId?: string;
  inicio?: string;
  inicioHorario?: string;
  fin?: string;
  finHorario?: string;
  estado: EstadoCita;
  estadoNombre?: string;
  diaCita?: string;
}

export interface CrearActualizarServicioCalendarioDto {
  unidadAdministrativaId?: string;
  servicioId?: string;
  planTrabajo: PlanSemanal;
  duracion: number;
  inicioAgendamiento?: string;
  finAgendamiento?: string;
  diasDisponibilidad: number;
  citaAutomatica: boolean;
  horasGracia: number;
  usarVentanillas: boolean;
}

export interface CrearActualizarUnidadAdministrativaDto {
  unidadAdministrativaId: string;
  planTrabajo: PlanSemanal;
}

export interface CrearCitaSalida {
  satisfactorio: boolean;
  mensajeError?: string;
}

export interface CreateUpdateCitaDto {
  unidadAdministrativaId: string;
  servicioId: string;
  personaId?: string;
  funcionarioId?: string;
  inicio?: string;
  fin?: string;
  estado: EstadoCita;
}

export interface GetCitaInput extends PagedAndSortedResultRequestDto {
  filter?: string;
  personaId?: string;
}

export interface ObtenerCitaEntrada {
  unidadAdministrativaId: string;
  servicioId: string;
  fecha?: string;
}

export interface ObtenerDisponibilidadEntrada {
  unidadAdministrativaId: string;
  servicioId: string;
  fecha: string;
}

export interface ObtenerServicioCalendarioEntrada {
  unidadAdministrativaId: string;
  servicioId: string;
  fecha?: string;
}

export interface PeriodoDisponibleDto {
  dia?: string;
  horarios: string[];
}

export interface ReagendarCitaDto {
  id: string;
  inicio: string;
}

export interface ServicioCalendarioDto {
  id?: string;
  unidadAdministrativaId?: string;
  servicioId?: string;
  planTrabajo: PlanSemanal;
  duracion: number;
  inicioAgendamiento?: string;
  finAgendamiento?: string;
  diasDisponibilidad: number;
  citaAutomatica: boolean;
  horasGracia: number;
  usarVentanillas: boolean;
}

export interface ServicioCalendarioLookupDto extends EntityDto<string> {
  unidadAdministrativaId?: string;
  servicioId?: string;
}

export interface UnidadAdministrativaCalendarioDto {
  id?: string;
  unidadAdministrativaId?: string;
  unidadAdministrativaNombre?: string;
  planTrabajo: PlanSemanal;
}
